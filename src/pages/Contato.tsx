import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Phone, MapPin, Clock, Send } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { empresa, servicos } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import Stagger from '../components/Stagger'
import ClickSpark from '../components/reactbits/ClickSpark'
import { TopoPagina, Localizacao } from '../components/Secoes'
import { CampoTexto, CampoArea, CampoSelect, CheckboxConsentimento, Loader } from '../components/ui/Campos'

type Erros = Partial<Record<'nome' | 'telefone' | 'servico' | 'consentimento', string>>

function mascaraTelefone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function Formulario() {
  const [dados, setDados] = useState({ nome: '', telefone: '', servico: '', mensagem: '' })
  const [consent, setConsent] = useState(false)
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)

  const validar = () => {
    const e: Erros = {}
    if (dados.nome.trim().length < 2) e.nome = 'Conta pra gente seu nome.'
    if (dados.telefone.replace(/\D/g, '').length < 10) e.telefone = 'Informe um telefone com DDD.'
    if (!dados.servico) e.servico = 'Escolha uma opção.'
    if (!consent) e.consentimento = 'Precisamos do seu consentimento para responder.'
    setErros(e)
    return Object.keys(e).length === 0
  }

  const enviar = (ev: FormEvent) => {
    ev.preventDefault()
    if (!validar()) return
    setEnviando(true)
    const texto = [
      'Olá, Kathleen! Vim pelo formulário do site.',
      '',
      `*Nome:* ${dados.nome.trim()}`,
      `*Telefone:* ${dados.telefone}`,
      `*Interesse:* ${dados.servico}`,
      dados.mensagem.trim() ? `*Mensagem:* ${dados.mensagem.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    setTimeout(() => {
      window.open(waLink(texto), '_blank', 'noopener')
      setEnviando(false)
    }, 700)
  }

  const set = (k: keyof typeof dados) => (e: { target: { value: string } }) =>
    setDados((d) => ({ ...d, [k]: k === 'telefone' ? mascaraTelefone(e.target.value) : e.target.value }))

  return (
    <form onSubmit={enviar} noValidate className="space-y-6 rounded-[var(--radius)] bg-areia/60 p-6 md:p-10">
      <h2 className="font-display text-3xl">Prefere deixar uma mensagem?</h2>
      <p className="-mt-3 text-pedra">Preencha e o WhatsApp abre com tudo pronto para enviar.</p>
      <CampoTexto id="nome" label="Seu nome" autoComplete="name" value={dados.nome} onChange={set('nome')} erro={erros.nome} />
      <CampoTexto id="telefone" label="Telefone com DDD" type="tel" inputMode="tel" autoComplete="tel" value={dados.telefone} onChange={set('telefone')} erro={erros.telefone} />
      <CampoSelect id="servico" label="Interesse" value={dados.servico} onChange={set('servico')} erro={erros.servico}>
        <option value="" disabled hidden />
        {servicos.map((s) => (
          <option key={s.slug} value={s.nome}>{s.nome}</option>
        ))}
        <option value="Ainda não sei">Ainda não sei</option>
      </CampoSelect>
      <CampoArea id="mensagem" label="Conte um pouco do seu momento (opcional)" value={dados.mensagem} onChange={set('mensagem')} />
      <CheckboxConsentimento id="lgpd" checked={consent} onChange={setConsent} erro={erros.consentimento}>
        Autorizo o uso dos meus dados para receber o retorno da Kathleen, conforme a{' '}
        <Link to="/politica-de-privacidade" className="underline underline-offset-4 hover:text-argila">Política de Privacidade</Link>.
      </CheckboxConsentimento>
      <ClickSpark>
        <button type="submit" disabled={enviando} className="btn-primary w-full justify-center sm:w-auto">
          <span className="btn-fill" aria-hidden />
          {enviando ? (
            <Loader />
          ) : (
            <>
              <span className="relative">Enviar pelo WhatsApp</span>
              <Send className="relative h-4 w-4" strokeWidth={1.5} aria-hidden />
            </>
          )}
        </button>
      </ClickSpark>
    </form>
  )
}

export default function Contato() {
  useSeo({
    title: 'Contato e agendamento · Nutricionista nos Ingleses, Florianópolis',
    description:
      'Agende sua consulta com a nutricionista Kathleen Meus: WhatsApp (48) 99204-0449, Rua Luiz Elias Daux, 781, Ingleses Norte, Florianópolis.',
    path: '/contato',
  })

  const canais = [
    { icone: MessageCircle, titulo: 'WhatsApp', valor: empresa.telefone, href: waLink('Olá, Kathleen! Gostaria de agendar uma consulta.'), ext: true, nota: 'O jeito mais rápido de agendar' },
    { icone: Phone, titulo: 'Telefone', valor: empresa.telefone, href: `tel:${empresa.telefoneLink}`, nota: 'Ligue no horário de atendimento' },
    { icone: MapPin, titulo: 'Endereço', valor: `${empresa.endereco.rua}, ${empresa.endereco.bairro}`, href: empresa.mapsUrl, ext: true, nota: `${empresa.endereco.cidade}/${empresa.endereco.uf} · ${empresa.endereco.cep}` },
  ]

  return (
    <>
      <TopoPagina
        sobretitulo="Contato e agendamento"
        titulo="Vamos marcar sua consulta?"
        destaque={['consulta?']}
        texto="Chame no WhatsApp, ligue ou deixe uma mensagem. A Kathleen responde pessoalmente."
      />
      <section className="container-site grid gap-12 pb-24 md:grid-cols-12 md:pb-32">
        <div className="md:col-span-5">
          <Stagger as="ul" className="divide-y divide-tinta/15 border-y border-tinta/15">
            {canais.map((c) => (
              <li key={c.titulo}>
                <a href={c.href} target={c.ext ? '_blank' : undefined} rel={c.ext ? 'noopener' : undefined} className="group flex gap-5 py-7">
                  <c.icone className="mt-1 h-6 w-6 shrink-0 text-argila" strokeWidth={1.25} aria-hidden />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-pedra">{c.titulo}</span>
                    <span className="mt-1 block font-display text-2xl transition-colors group-hover:text-argila">{c.valor}</span>
                    <span className="mt-1 block text-sm text-pedra">{c.nota}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="flex gap-5 py-7">
              <Clock className="mt-1 h-6 w-6 shrink-0 text-argila" strokeWidth={1.25} aria-hidden />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-pedra">Horários</span>
                <ul className="mt-2 space-y-1">
                  {empresa.horarios.map((h) => (
                    <li key={h.dias}><strong>{h.dias}:</strong> <span className="text-pedra">{h.horas} {h.obs}</span></li>
                  ))}
                </ul>
              </div>
            </li>
          </Stagger>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Formulario />
        </div>
      </section>
      <Localizacao />
    </>
  )
}
