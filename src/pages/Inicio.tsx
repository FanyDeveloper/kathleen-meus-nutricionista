import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MessageCircle, ClipboardList, Salad, HeartHandshake } from 'lucide-react'
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap'
import { useSeo } from '../hooks/useSeo'
import { empresa, servicos, trechos } from '../data/empresa'
import { imagens, type ImagemKey } from '../data/imagens'
import SplitText from '../components/reactbits/SplitText'
import ScrollReveal from '../components/reactbits/ScrollReveal'
import LogoLoop from '../components/reactbits/LogoLoop'
import CountUp from '../components/reactbits/CountUp'
import ShinyText from '../components/reactbits/ShinyText'
import Magnet from '../components/reactbits/Magnet'
import TiltedCard from '../components/reactbits/TiltedCard'
import Foto from '../components/Foto'
import Ilustra from '../components/Ilustra'
import MaskTitle from '../components/MaskTitle'
import Stagger from '../components/Stagger'
import { BotaoWhatsApp, LinkSecundario } from '../components/ui/Botoes'
import { Avaliacoes, ChamadaFinal, Estrelas, Localizacao, NotaGoogle } from '../components/Secoes'

function Hero() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ delay: 0.3 })
          .fromTo(
            '[data-hero="img"]',
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.out' },
            0,
          )
          .from('[data-hero="arco"]', { opacity: 0, scale: 0.94, duration: 1, ease: 'expo.out' }, 0.1)
          .from('[data-hero="sub"]', { y: 24, opacity: 0, duration: 0.7 }, 0.35)
          .from('[data-hero="cta"] > *', { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.5)
          .from('[data-hero="ilu"]', { y: 40, opacity: 0, scale: 0.8, duration: 0.9, stagger: 0.1, ease: 'expo.out' }, 0.6)
          .from('[data-hero="tag"]', { x: -24, opacity: 0, duration: 0.6 }, 0.8)

        // as ilustrações acompanham a rolagem em velocidades diferentes (profundidade)
        gsap.to('[data-par="1"]', { yPercent: -35, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
        gsap.to('[data-par="2"]', { yPercent: -70, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } })
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="grain relative overflow-hidden pt-28 md:pt-32">
      <div className="container-site grid items-center gap-14 pb-20 md:grid-cols-12 md:gap-8 md:pb-28">
        <div className="md:col-span-6">
          <p className="eyebrow">Nutricionista nos Ingleses · Florianópolis</p>
          <SplitText
            text="Emagrecer sem dieta restritiva, comendo comida de verdade."
            highlight={['comida', 'verdade']}
            className="mt-6 font-display text-[2.9rem] leading-[0.93] tracking-tight sm:text-6xl lg:text-[5rem]"
          />
          <p data-hero="sub" className="mt-8 max-w-lg text-lg text-pedra">
            Sou a Kathleen. Monto seu plano alimentar a partir da sua rotina real e acompanho de perto até você voltar a
            confiar no próprio corpo. Consultório nos Ingleses Norte, pertinho de você.
          </p>
          <div data-hero="cta" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Magnet>
              <BotaoWhatsApp>Agendar minha consulta</BotaoWhatsApp>
            </Magnet>
            <LinkSecundario to="/servicos">Ver serviços</LinkSecundario>
          </div>
          <div data-hero="cta" className="mt-10">
            <NotaGoogle />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] md:col-span-6 md:mr-0">
          {/* placa de fundo + arco desenhado = profundidade */}
          <div aria-hidden className="absolute -right-4 bottom-0 top-[22%] w-[88%] rounded-[var(--radius)] bg-areia md:-right-8" />
          <div data-hero="arco" aria-hidden className="arco absolute inset-0 -translate-x-4 -translate-y-4 border border-argila/40 md:-translate-x-6 md:-translate-y-6" />

          <div data-hero="img" className="arco relative overflow-hidden">
            <Foto
              img="kathleen-hero"
              alt="Kathleen Meus, nutricionista, de blazer preto no consultório nos Ingleses"
              prioridade
              parallax={false}
              className="aspect-[4/5] rounded-none!"
              posicao="center 25%"
            />
          </div>

          <div data-par="1" className="absolute -left-10 bottom-[18%] w-36 sm:w-44 md:-left-20 md:w-52">
            <div data-hero="ilu"><Ilustra nome="salada" /></div>
          </div>
          <div data-par="2" className="absolute -right-3 -top-6 w-20 sm:w-24 md:-right-10 md:w-28">
            <div data-hero="ilu"><Ilustra nome="rabanete" girar={14} atraso={1.2} /></div>
          </div>

          <div
            data-hero="tag"
            className="absolute -bottom-6 left-4 max-w-[16rem] rounded-[var(--radius)] bg-creme p-5 shadow-[0_18px_40px_-22px_rgba(31,33,25,.5)] md:left-auto md:right-6"
          >
            <p className="font-display text-4xl leading-none text-oliva">
              +<CountUp to={empresa.mulheresAtendidas} />
            </p>
            <p className="mt-2 text-sm leading-snug text-pedra">
              mulheres atendidas com o <ShinyText text="Método RENOVA" className="font-semibold" />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function QuemSou() {
  return (
    <section className="container-site grid gap-12 py-24 md:grid-cols-12 md:gap-8 md:py-36">
      <div className="md:col-span-4 md:col-start-1 md:pt-24">
        <Foto img="kathleen-mesa" alt="Kathleen Meus em sua mesa de atendimento no consultório" className="aspect-[4/5]" />
      </div>
      <div className="md:col-span-7 md:col-start-6">
        <p className="eyebrow">Prazer, Kathleen</p>
        <ScrollReveal className="mt-6 font-display text-[1.9rem] leading-[1.15] tracking-tight md:text-[2.9rem]">
          Já atendi mais de mil mulheres e quase todas chegaram com a mesma história: dietas que não cabiam na vida, culpa a cada refeição e o efeito sanfona. Meu trabalho é o contrário disso.
        </ScrollReveal>
        <p className="mt-8 max-w-lg text-pedra">
          Aqui não tem cardápio mirabolante nem bronca. Tem conversa, um plano feito para os seus horários e
          acompanhamento de verdade, para você emagrecer e manter.
        </p>
        <LinkSecundario to="/sobre" className="mt-8">Conhecer minha história</LinkSecundario>
      </div>
    </section>
  )
}

function ListaServicos() {
  return (
    <section className="bg-areia/60 py-24 md:py-36">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <MaskTitle text="Do que você|precisa agora" italic={[1]} className="text-5xl leading-[0.95] md:text-7xl" />
          <p className="max-w-sm text-pedra">Cada atendimento começa pela sua rotina. Escolha por onde quer começar.</p>
        </div>
        <Stagger as="ul" className="mt-16 border-t border-tinta/15">
          {servicos.map((s) => {
            const im = imagens[s.imagem]
            return (
              <li key={s.slug} className="border-b border-tinta/15">
                <Link
                  to={`/servicos/${s.slug}`}
                  className="group grid items-center gap-6 py-8 md:grid-cols-12 md:gap-10 md:py-10"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-[var(--radius)] bg-areia md:col-span-4 md:aspect-[4/3]">
                    <img
                      src={im.src}
                      width={im.width}
                      height={im.height}
                      alt={s.imagemAlt}
                      loading="lazy"
                      decoding="async"
                      className="foto h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="md:col-span-7">
                    <h3 className="font-display text-3xl tracking-tight transition-colors duration-300 group-hover:text-argila md:text-5xl">
                      {s.nome}
                    </h3>
                    <p className="mt-3 max-w-xl text-lg text-pedra">{s.beneficio}</p>
                  </div>
                  <div className="hidden justify-end md:col-span-1 md:flex">
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-tinta/20 transition-colors duration-500 group-hover:border-argila group-hover:bg-argila group-hover:text-creme">
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.25} aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

function Diferenciais() {
  return (
    <section className="container-site py-24 md:py-36">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <MaskTitle text="Por que elas|ficam até o fim" italic={[1]} className="text-5xl leading-[0.95] md:col-span-7 md:text-7xl" />
        <p className="max-w-md text-pedra md:col-span-5">
          Não é força de vontade. É um acompanhamento pensado para caber na vida, com escuta e ajuste fino a cada retorno.
        </p>
      </div>

      <Stagger className="mt-16 grid gap-6 md:grid-cols-12 md:auto-rows-[minmax(360px,auto)] md:gap-7">
        {/* rotina */}
        <TiltedCard className="md:col-span-7" cardClass="bg-oliva p-8 text-creme md:p-12">
          <div className="depth-1 relative z-10 flex h-full max-w-[24rem] flex-col">
            <Salad className="h-7 w-7 text-areia" strokeWidth={1.25} aria-hidden />
            <h3 className="mt-6 font-display text-[2.2rem] leading-[1.05] md:text-5xl">Um plano que cabe na sua rotina</h3>
            <p className="mt-4 text-creme/80">Horário apertado, almoço na rua, filhos, plantão. O plano parte do seu dia como ele é.</p>
            <p className="mt-auto pt-8 text-sm italic text-creme/70">“Com ela não tem nada mirabolante ou prescrições difíceis de seguir.” · Jeane</p>
          </div>
          <div className="depth-3 absolute -bottom-8 -right-4 w-44 sm:w-56 md:-right-10 md:w-80">
            <Ilustra nome="salada" cor="creme" />
          </div>
        </TiltedCard>

        {/* acolhimento */}
        <TiltedCard className="md:col-span-5" cardClass="bg-areia p-8 md:p-10">
          <div className="depth-1 relative z-10 flex h-full flex-col">
            <HeartHandshake className="h-7 w-7 text-argila" strokeWidth={1.25} aria-hidden />
            <h3 className="mt-6 max-w-[14rem] font-display text-4xl leading-[1.05]">Sem bronca, sem julgamento</h3>
            <p className="mt-4 max-w-xs text-pedra">Escorregou no fim de semana? Faz parte. A gente conversa, ajusta e segue.</p>
            <p className="mt-auto pt-8 text-sm italic text-pedra">“Extremamente acolhedora, não julga.” · Juliana</p>
          </div>
          <div className="depth-2 absolute -right-4 -top-10 w-28 md:-right-8 md:w-36">
            <Ilustra nome="alface" girar={-12} atraso={0.8} />
          </div>
        </TiltedCard>

        {/* nota */}
        <TiltedCard className="md:col-span-5" cardClass="border border-tinta/15 bg-creme p-8 md:p-10">
          <div className="depth-1 relative z-10 flex h-full flex-col">
            <p className="eyebrow">Avaliação no Google</p>
            <p className="mt-6 font-display text-[6.5rem] leading-[0.85] text-oliva">
              <CountUp to={empresa.google.nota} decimals={1} />
            </p>
            <Estrelas className="mt-4" />
            <p className="mt-3 text-pedra">
              Nota máxima em {empresa.google.avaliacoes} avaliações de pacientes reais.
            </p>
            <a href={empresa.mapsUrl} target="_blank" rel="noopener" className="mt-auto pt-6 text-sm font-semibold underline underline-offset-4 hover:text-argila">
              Ver no Google Maps
            </a>
          </div>
          <div className="depth-3 absolute -bottom-6 -right-2 w-36 md:-right-8 md:w-48">
            <Ilustra nome="berinjela" girar={-18} atraso={1.6} />
          </div>
        </TiltedCard>

        {/* resultado medido */}
        <TiltedCard className="md:col-span-7" cardClass="bg-argila p-8 text-creme md:p-10">
          <div className="grid h-full gap-8 sm:grid-cols-2">
            <div className="depth-1 relative z-10 flex flex-col">
              <ClipboardList className="h-7 w-7" strokeWidth={1.25} aria-hidden />
              <h3 className="mt-6 font-display text-4xl leading-[1.05]">Resultado medido, não chutado</h3>
              <p className="mt-4 text-creme/85">
                Medidas e dobras cutâneas a cada retorno, para você enxergar o que a balança esconde.
              </p>
              <Link to="/servicos/avaliacao-corporal" className="mt-auto pt-6 text-sm font-semibold underline underline-offset-4">
                Como é a avaliação
              </Link>
            </div>
            <div className="depth-2 relative min-h-[220px] overflow-hidden rounded-[calc(var(--radius)*0.8)]">
              <img
                src={imagens['avaliacao-corporal'].src}
                width={imagens['avaliacao-corporal'].width}
                height={imagens['avaliacao-corporal'].height}
                alt="Adipômetro, fita métrica e instrumentos de avaliação corporal"
                loading="lazy"
                className="foto absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="depth-3 absolute -left-6 -top-12 w-24 md:-left-10 md:w-32">
            <Ilustra nome="aspargos" cor="creme" girar={-20} atraso={0.4} />
          </div>
        </TiltedCard>
      </Stagger>
    </section>
  )
}

const passos = [
  { icone: MessageCircle, titulo: 'Um oi no WhatsApp', texto: 'Você conta rapidinho o que procura e escolhe o melhor horário. Sem formulário enorme.' },
  { icone: HeartHandshake, titulo: 'Consulta sem pressa', texto: 'Conversa sobre sua rotina, histórico e objetivos, mais a avaliação corporal completa.' },
  { icone: Salad, titulo: 'Seu plano em mãos', texto: 'Um plano alimentar com opções que você conhece, substituições e orientações claras.' },
  { icone: ClipboardList, titulo: 'Retornos e ajustes', texto: 'Acompanhamos a evolução e mudamos o que for preciso até o resultado aparecer e ficar.' },
]

function ComoFunciona() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const root = ref.current!
        root.classList.add('pin-on')
        const cards = gsap.utils.toArray<HTMLElement>('[data-step]', root)
        const names = gsap.utils.toArray<HTMLElement>('[data-name]', root)
        gsap.set(cards.slice(1), { yPercent: 105, opacity: 0 })
        gsap.set(names.slice(1), { opacity: 0.35 })
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${window.innerHeight * (cards.length - 1) * 0.85}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        cards.forEach((c, i) => {
          if (i === 0) return
          tl.to(cards[i - 1], { yPercent: -12, scale: 0.94, opacity: 0, ease: 'power2.inOut' }, `s${i}`)
            .to(c, { yPercent: 0, opacity: 1, ease: 'power2.out' }, `s${i}`)
            .to(names[i - 1], { opacity: 0.35 }, `s${i}`)
            .to(names[i], { opacity: 1 }, `s${i}`)
        })
        tl.fromTo('[data-progress]', { scaleX: 0.25 }, { scaleX: 1, ease: 'none', duration: tl.duration() }, 0)
        return () => root.classList.remove('pin-on')
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="como-funciona bg-oliva-escuro text-creme">
      <div className="container-site grid min-h-[100svh] content-center gap-10 py-20 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="eyebrow text-areia/80">Como funciona</p>
          <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
            Do primeiro oi <em className="text-areia">ao resultado</em>
          </h2>
          <div className="mt-10 hidden h-px w-full bg-creme/15 md:block">
            <div data-progress className="h-px origin-left bg-areia" />
          </div>
          <ul className="mt-6 hidden space-y-2 md:block">
            {passos.map((p) => (
              <li key={p.titulo} data-name className="text-lg">{p.titulo}</li>
            ))}
          </ul>
        </div>
        <div className="steps relative md:col-span-6 md:col-start-7">
          {passos.map((p) => (
            <article key={p.titulo} data-step className="step rounded-[var(--radius)] bg-creme p-8 text-tinta md:p-12">
              <p.icone className="h-8 w-8 text-argila" strokeWidth={1.25} aria-hidden />
              <h3 className="mt-8 font-display text-3xl md:text-5xl">{p.titulo}</h3>
              <p className="mt-4 max-w-md text-lg text-pedra">{p.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Trechos() {
  return (
    <section className="border-y border-tinta/10 py-10" aria-label="Trechos de avaliações no Google">
      <LogoLoop items={trechos} speed={55} />
    </section>
  )
}

type CantoItem = { img: ImagemKey; alt: string; titulo: string; texto: string; classe: string; aspecto: string }

const cantos: CantoItem[] = [
  {
    img: 'porta-consultorio',
    alt: 'Porta de madeira do consultório ao lado de um jardim vertical',
    titulo: 'Chegou, respirou',
    texto: 'O jardim vertical na entrada já avisa: aqui a conversa é sem pressa.',
    classe: 'md:col-span-5 md:row-span-2',
    aspecto: 'aspect-[4/5] md:aspect-auto md:h-full',
  },
  {
    img: 'consultorio',
    alt: 'Sala de atendimento da nutricionista, com mesa e cadeiras',
    titulo: 'Onde o seu plano nasce',
    texto: 'A sala em que a gente olha sua rotina com calma e monta tudo junto.',
    classe: 'md:col-span-7',
    aspecto: 'aspect-[16/10]',
  },
  {
    img: 'avaliacao-corporal',
    alt: 'Maleta com adipômetro e fita métrica sobre a bancada',
    titulo: 'Medir para enxergar',
    texto: 'Adipômetro e fita para acompanhar o que a balança não conta.',
    classe: 'md:col-span-4',
    aspecto: 'aspect-[4/5]',
  },
  {
    img: 'sacolas',
    alt: 'Sacolas preparadas para entregar às pacientes',
    titulo: 'Um mimo na saída',
    texto: 'Detalhes preparados com carinho para cada paciente.',
    classe: 'md:col-span-3',
    aspecto: 'aspect-[4/5]',
  },
]

function Consultorio() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="relative md:col-span-7">
            <p className="eyebrow">O consultório</p>
            <MaskTitle text="Um lugar para|respirar e conversar" italic={[1]} className="mt-4 text-5xl leading-[0.95] md:text-7xl" />
            <div className="absolute -top-10 right-0 hidden w-24 md:block lg:right-10">
              <Ilustra nome="aspargos" girar={18} atraso={0.6} />
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-pedra">
              Fica na Rua Luiz Elias Daux, nos Ingleses Norte, dentro de um espaço de saúde integrada. Luz natural, madeira
              e verde, e uma cadeira confortável para falar de comida sem pressa.
            </p>
            <LinkSecundario to="/sobre" className="mt-6">Conhecer o espaço</LinkSecundario>
          </div>
        </div>

        <Stagger className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-12 md:gap-y-10">
          {cantos.map((c) => (
            <figure key={c.img} className={`group flex flex-col ${c.classe}`}>
              <div className={`relative flex-1 overflow-hidden rounded-[var(--radius)] bg-areia ${c.aspecto}`}>
                <img
                  src={imagens[c.img].src}
                  width={imagens[c.img].width}
                  height={imagens[c.img].height}
                  alt={c.alt}
                  loading="lazy"
                  decoding="async"
                  className="foto absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.05]"
                />
              </div>
              <figcaption className="mt-5 flex items-start gap-4 border-t border-tinta/15 pt-4">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-argila transition-transform duration-500 group-hover:scale-[2]" />
                <div>
                  <h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-argila md:text-[1.7rem]">{c.titulo}</h3>
                  <p className="mt-1 max-w-sm text-[15px] text-pedra">{c.texto}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

export default function Inicio() {
  useSeo({
    title: 'Nutricionista nos Ingleses, Florianópolis · Emagrecimento sem dieta restritiva',
    description:
      'Kathleen Meus, nutricionista nos Ingleses Norte, Florianópolis. Emagrecimento feminino com o Método RENOVA, plano alimentar personalizado e avaliação corporal. 5,0 no Google.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <div className="border-y border-tinta/10 bg-creme py-6">
        <LogoLoop items={[...servicos.map((s) => s.nome), 'Ingleses Norte', 'Florianópolis']} />
      </div>
      <QuemSou />
      <ListaServicos />
      <Diferenciais />
      <ComoFunciona />
      <Avaliacoes />
      <Trechos />
      <Consultorio />
      <Localizacao />
      <ChamadaFinal />
    </>
  )
}
