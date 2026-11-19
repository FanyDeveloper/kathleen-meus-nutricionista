// Seções reutilizadas entre páginas: avaliações, localização, FAQ, chamada final e topo de página interna
import { useState } from 'react'
import { Star, MapPin, Clock, Phone, Navigation, Plus } from 'lucide-react'
import { empresa, avaliacoes } from '../data/empresa'
import { msgServico } from '../lib/whatsapp'
import MaskTitle from './MaskTitle'
import Stagger from './Stagger'
import CountUp from './reactbits/CountUp'
import Magnet from './reactbits/Magnet'
import SplitText from './reactbits/SplitText'
import { BotaoWhatsApp } from './ui/Botoes'

export function Estrelas({ n = 5, className = '' }: { n?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 text-argila ${className}`} aria-label={`Nota ${n} de 5`} role="img">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} aria-hidden />
      ))}
    </span>
  )
}

export function NotaGoogle({ className = '' }: { className?: string }) {
  return (
    <a
      href={empresa.mapsUrl}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-3 text-[15px] text-pedra transition-colors hover:text-tinta ${className}`}
    >
      <Estrelas />
      <span>
        <strong className="font-semibold text-tinta">5,0 no Google</strong> · {empresa.google.avaliacoes} avaliações
      </span>
    </a>
  )
}

export function Avaliacoes() {
  const [destaque, ...resto] = avaliacoes
  return (
    <section className="container-site py-24 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">Quem já passou por aqui</p>
          <MaskTitle text="O que dizem|as pacientes" italic={[1]} className="mt-4 text-5xl leading-[0.95] md:text-6xl" />
          <div className="mt-10 flex items-end gap-4">
            <CountUp to={empresa.google.nota} decimals={1} className="font-display text-7xl leading-none text-oliva" />
            <div className="pb-2">
              <Estrelas />
              <p className="mt-1 text-sm text-pedra">
                <CountUp to={empresa.google.avaliacoes} /> avaliações no Google
              </p>
            </div>
          </div>
          <a href={empresa.mapsUrl} target="_blank" rel="noopener" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4 hover:text-argila">
            Ler todas no Google Maps
          </a>
        </div>

        <div className="md:col-span-8">
          <figure className="border-l border-argila/40 pl-6 md:pl-10">
            <blockquote className="font-display text-2xl leading-snug md:text-[2.1rem]">
              “{destaque.texto}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-sm text-pedra">
              <Estrelas n={destaque.nota} />
              <span><strong className="text-tinta">{destaque.nome}</strong> · Avaliação no Google · {destaque.quando}</span>
            </figcaption>
          </figure>
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 md:pl-10">
            {resto.map((a) => (
              <figure key={a.nome} className="rounded-[var(--radius)] bg-areia/70 p-6">
                <Estrelas n={a.nota} />
                <blockquote className="mt-3 leading-relaxed">“{a.texto}”</blockquote>
                <figcaption className="mt-4 text-sm text-pedra">
                  <strong className="text-tinta">{a.nome}</strong> · Avaliação no Google
                </figcaption>
              </figure>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}

export function Localizacao() {
  return (
    <section className="bg-areia/60">
      <div className="container-site grid gap-10 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <p className="eyebrow">Como chegar</p>
          <MaskTitle text="No coração|dos Ingleses" italic={[1]} className="mt-4 text-5xl leading-[0.95] md:text-6xl" />
          <ul className="mt-10 space-y-6">
            <li className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-argila" strokeWidth={1.5} aria-hidden />
              <div>
                <p className="font-semibold">{empresa.endereco.rua}</p>
                <p className="text-pedra">{empresa.endereco.bairro} · {empresa.endereco.cidade}/{empresa.endereco.uf} · {empresa.endereco.cep}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-argila" strokeWidth={1.5} aria-hidden />
              <ul>
                {empresa.horarios.map((h) => (
                  <li key={h.dias}>
                    <span className="font-semibold">{h.dias}:</span> <span className="text-pedra">{h.horas} {h.obs}</span>
                  </li>
                ))}
              </ul>
            </li>
            <li className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-argila" strokeWidth={1.5} aria-hidden />
              <a href={`tel:${empresa.telefoneLink}`} className="font-semibold hover:text-argila">{empresa.telefone}</a>
            </li>
          </ul>
          <a href={empresa.mapsUrl} target="_blank" rel="noopener" className="link-sec group mt-10">
            <span className="link-sec__txt">Abrir rota no Google Maps</span>
            <Navigation className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          </a>
        </div>
        <div className="md:col-span-7">
          <div className="overflow-hidden rounded-[var(--radius)] border border-tinta/10 bg-areia">
            <iframe
              title="Mapa do consultório da nutricionista Kathleen Meus nos Ingleses Norte, Florianópolis"
              src={empresa.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mapa h-[360px] w-full md:h-[480px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export function Faq({ itens, titulo = 'Dúvidas|que sempre aparecem' }: { itens: { p: string; r: string }[]; titulo?: string }) {
  const [aberto, setAberto] = useState<number | null>(0)
  return (
    <div className="grid gap-10 md:grid-cols-12">
      <MaskTitle text={titulo} italic={[1]} className="text-4xl leading-[0.95] md:col-span-4 md:text-5xl" />
      <ul className="divide-y divide-tinta/15 border-y border-tinta/15 md:col-span-8">
        {itens.map((f, i) => {
          const open = aberto === i
          return (
            <li key={f.p}>
              <h3>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold transition-colors hover:text-argila"
                  aria-expanded={open}
                  aria-controls={`faq-${i}`}
                  onClick={() => setAberto(open ? null : i)}
                >
                  {f.p}
                  <Plus className={`h-5 w-5 shrink-0 transition-transform duration-500 ${open ? 'rotate-45 text-argila' : ''}`} strokeWidth={1.5} aria-hidden />
                </button>
              </h3>
              <div id={`faq-${i}`} className={`faq-body ${open ? 'is-open' : ''}`}>
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-6 text-pedra">{f.r}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ChamadaFinal({ frase = 'Bora montar um plano|que caiba na sua vida?', mensagem }: { frase?: string; mensagem?: string }) {
  return (
    <section className="container-site py-24 md:py-36">
      <div className="grain relative overflow-hidden rounded-[calc(var(--radius)*2)] bg-oliva px-6 py-16 text-creme md:px-16 md:py-24">
        <MaskTitle text={frase} className="max-w-4xl text-[2.6rem] leading-[0.95] md:text-7xl" italic={[1]} />
        <p className="mt-6 max-w-lg text-creme/80">
          Manda uma mensagem contando um pouco do seu momento. A Kathleen responde pessoalmente e vocês combinam o melhor horário.
        </p>
        <div className="mt-10">
          <Magnet>
            <BotaoWhatsApp escuro mensagem={mensagem}>Chamar no WhatsApp</BotaoWhatsApp>
          </Magnet>
        </div>
      </div>
    </section>
  )
}

export function TopoPagina({ sobretitulo, titulo, texto, destaque = [] }: { sobretitulo: string; titulo: string; texto: string; destaque?: string[] }) {
  return (
    <section className="container-site pb-14 pt-36 md:pb-20 md:pt-48">
      <p className="eyebrow">{sobretitulo}</p>
      <SplitText text={titulo} highlight={destaque} className="mt-5 max-w-5xl font-display text-[2.8rem] leading-[0.95] tracking-tight md:text-[5.5rem]" />
      <p className="mt-8 max-w-xl text-lg text-pedra">{texto}</p>
    </section>
  )
}

export { msgServico }
