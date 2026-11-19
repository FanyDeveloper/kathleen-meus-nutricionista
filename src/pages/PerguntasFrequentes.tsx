import { useEffect } from 'react'
import { useSeo } from '../hooks/useSeo'
import { faqGeral } from '../data/empresa'
import { TopoPagina, Faq, ChamadaFinal } from '../components/Secoes'

export default function PerguntasFrequentes() {
  useSeo({
    title: 'Perguntas frequentes · Nutricionista nos Ingleses, Florianópolis',
    description:
      'Valores, agendamento, localização, formas de pagamento e como funciona a consulta com a nutricionista Kathleen Meus nos Ingleses, Florianópolis.',
    path: '/perguntas-frequentes',
  })

  // JSON-LD FAQPage (só perguntas com resposta definida)
  useEffect(() => {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqGeral
        .filter((f) => !f.r.includes('[CONFIRMAR'))
        .map((f) => ({ '@type': 'Question', name: f.p, acceptedAnswer: { '@type': 'Answer', text: f.r } })),
    })
    document.head.appendChild(s)
    return () => s.remove()
  }, [])

  return (
    <>
      <TopoPagina
        sobretitulo="Dúvidas"
        titulo="Antes de marcar, a gente responde."
        destaque={['responde.']}
        texto="Juntamos aqui o que mais perguntam no WhatsApp. Se a sua dúvida não estiver na lista, é só chamar."
      />
      <section className="container-site pb-24 md:pb-36">
        <Faq itens={faqGeral} titulo="O que mais|perguntam" />
      </section>
      <ChamadaFinal frase="Ficou alguma|dúvida?" mensagem="Olá! Estava lendo as dúvidas no site e queria perguntar uma coisa." />
    </>
  )
}
