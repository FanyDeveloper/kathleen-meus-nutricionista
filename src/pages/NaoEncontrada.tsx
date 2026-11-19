import { useSeo } from '../hooks/useSeo'
import SplitText from '../components/reactbits/SplitText'
import { BotaoWhatsApp, LinkSecundario } from '../components/ui/Botoes'

export default function NaoEncontrada() {
  useSeo({ title: 'Página não encontrada', description: 'Essa página não existe.', path: '/404', noindex: true })

  return (
    <section className="grain container-site flex min-h-[85svh] flex-col justify-center pb-20 pt-36">
      <p className="font-display text-[28vw] italic leading-[0.8] text-areia md:text-[16rem]" aria-hidden>
        404
      </p>
      <SplitText
        text="Essa página saiu da dieta."
        highlight={['dieta.']}
        className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl"
      />
      <p className="mt-6 max-w-md text-lg text-pedra">
        O link que você abriu não existe mais ou mudou de lugar. Sem culpa: dá para voltar ao início ou falar direto com a Kathleen.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-8">
        <BotaoWhatsApp>Falar no WhatsApp</BotaoWhatsApp>
        <LinkSecundario to="/">Voltar ao início</LinkSecundario>
      </div>
    </section>
  )
}
