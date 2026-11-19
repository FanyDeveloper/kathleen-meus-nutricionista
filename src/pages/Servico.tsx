import { Link, useParams } from 'react-router-dom'
import { Check, ArrowUpRight } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { servicos } from '../data/empresa'
import { msgServico } from '../lib/whatsapp'
import Foto from '../components/Foto'
import MaskTitle from '../components/MaskTitle'
import Stagger from '../components/Stagger'
import SplitText from '../components/reactbits/SplitText'
import Magnet from '../components/reactbits/Magnet'
import { BotaoWhatsApp } from '../components/ui/Botoes'
import { ChamadaFinal, Faq, NotaGoogle } from '../components/Secoes'
import NaoEncontrada from './NaoEncontrada'

export default function Servico() {
  const { slug } = useParams()
  const s = servicos.find((x) => x.slug === slug)

  useSeo({
    title: s?.seoTitulo ?? 'Página não encontrada',
    description: s?.seoDescricao ?? '',
    path: `/servicos/${slug}`,
    noindex: !s,
  })

  if (!s) return <NaoEncontrada />
  const msg = msgServico(s.nome)
  const outros = servicos.filter((x) => x.slug !== s.slug)

  return (
    <>
      <section className="container-site grid gap-12 pb-20 pt-32 md:grid-cols-12 md:pb-28 md:pt-44">
        <div className="md:col-span-7">
          <nav aria-label="Trilha" className="text-sm text-pedra">
            <Link to="/servicos" className="hover:text-argila">Serviços</Link> <span aria-hidden>/</span> {s.nome}
          </nav>
          <SplitText text={s.nome} className="mt-6 font-display text-[3rem] leading-[0.93] tracking-tight md:text-[5.5rem]" />
          <p className="mt-8 max-w-xl text-xl leading-relaxed">{s.beneficio}</p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Magnet>
              <BotaoWhatsApp mensagem={msg}>Quero saber mais</BotaoWhatsApp>
            </Magnet>
            <NotaGoogle />
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <Foto img={s.imagem} alt={s.imagemAlt} className="aspect-[4/5]" prioridade />
        </div>
      </section>

      <section className="bg-areia/60 py-24 md:py-32">
        <div className="container-site grid gap-12 md:grid-cols-12">
          <MaskTitle text="O que é|e como ajuda" italic={[1]} className="text-4xl leading-[0.95] md:col-span-5 md:text-6xl" />
          <div className="space-y-5 text-lg text-pedra md:col-span-6 md:col-start-7">
            {s.descricao.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <MaskTitle text="Para quem é" className="text-4xl leading-[0.95] md:text-6xl" />
          <Stagger as="ul" className="mt-10 space-y-5">
            {s.paraQuem.map((p) => (
              <li key={p} className="flex gap-4 text-lg">
                <Check className="mt-1 h-5 w-5 shrink-0 text-argila" strokeWidth={1.5} aria-hidden />
                {p}
              </li>
            ))}
          </Stagger>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <MaskTitle text="Como funciona" className="text-4xl leading-[0.95] md:text-6xl" />
          <Stagger as="ol" className="relative mt-10 space-y-10 border-l border-tinta/20 pl-8">
            {s.comoFunciona.map((c) => (
              <li key={c.titulo} className="relative">
                <span aria-hidden className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-argila ring-4 ring-creme" />
                <h3 className="font-display text-2xl">{c.titulo}</h3>
                <p className="mt-2 text-pedra">{c.texto}</p>
              </li>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-site pb-24 md:pb-32">
        <Faq itens={s.faq} titulo={`Perguntas|sobre ${s.nome.toLowerCase().startsWith('método') ? 'o RENOVA' : 'o serviço'}`} />
      </section>

      <section className="container-site pb-8">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-pedra">Outros serviços</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {outros.map((o) => (
            <li key={o.slug}>
              <Link to={`/servicos/${o.slug}`} className="group flex items-center justify-between border-t border-tinta/15 py-5 font-display text-2xl transition-colors hover:text-argila">
                {o.nome}
                <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.25} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ChamadaFinal frase={`Vamos conversar|sobre o seu caso?`} mensagem={msg} />
    </>
  )
}
