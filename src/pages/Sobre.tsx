import { useSeo } from '../hooks/useSeo'
import { empresa } from '../data/empresa'
import Foto from '../components/Foto'
import MaskTitle from '../components/MaskTitle'
import Stagger from '../components/Stagger'
import ScrollReveal from '../components/reactbits/ScrollReveal'
import CountUp from '../components/reactbits/CountUp'
import { TopoPagina, ChamadaFinal, NotaGoogle } from '../components/Secoes'
import { BotaoWhatsApp } from '../components/ui/Botoes'

const valores = [
  { nome: 'Rotina primeiro', texto: 'O plano nasce dos seus horários, do seu bolso e do que você gosta de comer. Se não cabe na sua vida, não serve.' },
  { nome: 'Zero julgamento', texto: 'Ninguém aqui vai te dar bronca. Deslizes fazem parte, e é conversando sobre eles que a gente ajusta o caminho.' },
  { nome: 'Clareza', texto: 'Você entende o porquê de cada orientação. Sem termos difíceis, sem mistério.' },
  { nome: 'Acompanhar de perto', texto: 'Emagrecer é processo. Os retornos existem para ajustar, comemorar e não deixar você sozinha.' },
]

export default function Sobre() {
  useSeo({
    title: 'Sobre a Kathleen · Nutricionista nos Ingleses, Florianópolis',
    description:
      'Conheça Kathleen Meus, nutricionista nos Ingleses Norte, Florianópolis, que já atendeu mais de mil mulheres com emagrecimento sem dieta restritiva.',
    path: '/sobre',
  })

  return (
    <>
      <TopoPagina
        sobretitulo="Sobre"
        titulo="Nutrição que cabe na vida real."
        destaque={['vida', 'real']}
        texto="Kathleen Meus é nutricionista nos Ingleses Norte e dedica o consultório a um tipo de paciente: a mulher que cansou de dieta e quer emagrecer em paz com a comida."
      />

      <section className="container-site grid gap-12 pb-24 md:grid-cols-12 md:pb-36">
        <div className="md:col-span-5">
          <Foto img="kathleen-retrato" alt="Retrato de Kathleen Meus sentada, segurando uma xícara de café" className="aspect-[3/4]" posicao="center 20%" />
        </div>
        <div className="space-y-6 text-lg md:col-span-6 md:col-start-7 md:pt-16">
          <MaskTitle text="Uma história|com a comida" italic={[1]} className="text-4xl leading-[0.95] md:text-6xl" />
          <p className="text-pedra">
            Depois de ver tantas mulheres chegarem ao consultório exaustas de dietas que não funcionavam, a Kathleen
            resolveu fazer diferente: começar pela rotina de cada uma e construir, junto, um jeito de comer que dure.
          </p>
          <p className="text-pedra">
            Desse trabalho nasceu o {empresa.metodo}, e por ele já passaram mais de mil mulheres. A maioria chega
            dizendo que “já tentou de tudo”. E sai dizendo que, pela primeira vez, a dieta coube no dia a dia.
          </p>
          <p className="text-pedra">[CONFIRMAR: formação, ano de graduação, especializações e {empresa.crn}]</p>
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <div>
              <p className="font-display text-5xl text-oliva">
                +<CountUp to={empresa.mulheresAtendidas} />
              </p>
              <p className="text-sm text-pedra">mulheres atendidas</p>
            </div>
            <NotaGoogle />
          </div>
        </div>
      </section>

      <section className="bg-oliva py-24 text-creme md:py-36">
        <div className="container-site">
          <ScrollReveal className="max-w-5xl font-display text-[2rem] leading-[1.15] tracking-tight md:text-6xl">
            Não existe alimento proibido. Existe o que funciona para você, no seu ritmo, sem culpa no prato.
          </ScrollReveal>
        </div>
      </section>

      <section className="container-site py-24 md:py-36">
        <MaskTitle text="No que eu|acredito" italic={[1]} className="text-5xl leading-[0.95] md:text-7xl" />
        <Stagger as="dl" className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {valores.map((v, i) => (
            <div key={v.nome} className={`border-t border-tinta/15 pt-6 ${i % 2 === 1 ? 'md:mt-20' : ''}`}>
              <dt className="font-display text-3xl italic text-argila">{v.nome}</dt>
              <dd className="mt-3 max-w-md text-pedra">{v.texto}</dd>
            </div>
          ))}
        </Stagger>
      </section>

      <section className="bg-areia/60 py-24 md:py-36">
        <div className="container-site">
          <div className="grid gap-8 md:grid-cols-12">
            <MaskTitle text="O espaço|onde atendo" italic={[1]} className="text-5xl leading-[0.95] md:col-span-6 md:text-7xl" />
            <p className="text-pedra md:col-span-5 md:col-start-8 md:pt-6">
              O consultório fica na Rua Luiz Elias Daux, nos Ingleses Norte, dentro de um espaço de saúde integrada com
              fisioterapia, quiropraxia, massoterapia e acupuntura. [CONFIRMAR: nome da clínica parceira]
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
            <Foto img="fachada" alt="Fachada do prédio onde fica o consultório, nos Ingleses Norte" className="col-span-2 aspect-[4/5] md:col-span-5" />
            <div className="col-span-2 grid grid-cols-2 gap-4 md:col-span-7 md:gap-6 md:pt-24">
              <Foto img="porta-consultorio" alt="Porta do consultório com a lista de especialidades, ao lado de um jardim vertical" className="aspect-[3/4]" />
              <Foto img="espaco-interno" alt="Espaço interno da clínica com decoração clara" className="mt-12 aspect-[3/4]" />
              <Foto img="consultorio" alt="Sala de atendimento da nutricionista" className="col-span-2 aspect-[16/10]" />
            </div>
          </div>
          <div className="mt-14">
            <BotaoWhatsApp mensagem="Olá, Kathleen! Conheci seu espaço pelo site e quero agendar uma consulta.">
              Quero conhecer o consultório
            </BotaoWhatsApp>
          </div>
        </div>
      </section>

      <section className="container-site grid items-center gap-12 py-24 md:grid-cols-12 md:py-36">
        <div className="md:col-span-6">
          <MaskTitle text="Também levo|essa conversa|para fora" italic={[2]} className="text-4xl leading-[0.95] md:text-6xl" />
          <p className="mt-6 max-w-md text-pedra">
            Em palestras para empresas, academias e grupos, a Kathleen fala de alimentação com o mesmo tom do consultório:
            direto e sem terrorismo.
          </p>
        </div>
        <Foto img="kathleen-seminario" alt="Kathleen Meus apresentando um seminário para um grupo de mulheres" className="aspect-[4/5] md:col-span-4 md:col-start-8" />
      </section>

      <ChamadaFinal />
    </>
  )
}
