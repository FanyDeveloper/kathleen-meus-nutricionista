import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useSeo } from '../hooks/useSeo'
import { servicos } from '../data/empresa'
import { imagens } from '../data/imagens'
import Stagger from '../components/Stagger'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import { TopoPagina, ChamadaFinal, Avaliacoes } from '../components/Secoes'

export default function Servicos() {
  useSeo({
    title: 'Serviços de nutrição nos Ingleses, Florianópolis',
    description:
      'Método RENOVA, plano alimentar personalizado, avaliação corporal e palestras com a nutricionista Kathleen Meus, nos Ingleses Norte, Florianópolis.',
    path: '/servicos',
  })

  return (
    <>
      <TopoPagina
        sobretitulo="Serviços"
        titulo="Cada atendimento parte da sua rotina."
        destaque={['sua', 'rotina']}
        texto="Do emagrecimento feminino com o Método RENOVA à avaliação corporal, tudo é pensado para você conseguir seguir no dia a dia."
      />
      <section className="container-site pb-24 md:pb-36">
        <Stagger className="grid gap-5 md:grid-cols-12">
          {servicos.map((s, i) => {
            const im = imagens[s.imagem]
            const grande = i === 0 || i === 3
            return (
              <Link
                key={s.slug}
                to={`/servicos/${s.slug}`}
                className={`group block ${grande ? 'md:col-span-7' : 'md:col-span-5'}`}
              >
                <SpotlightCard className="flex h-full flex-col rounded-[var(--radius)] border border-tinta/10 bg-areia/50 transition-colors duration-500 hover:bg-areia">
                  <div className={`overflow-hidden rounded-t-[var(--radius)] ${grande ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                    <img
                      src={im.src}
                      width={im.width}
                      height={im.height}
                      alt={s.imagemAlt}
                      loading="lazy"
                      className="foto h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-9">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-display text-3xl tracking-tight md:text-4xl">{s.nome}</h2>
                      <ArrowUpRight className="mt-2 h-6 w-6 shrink-0 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.25} aria-hidden />
                    </div>
                    <p className="mt-3 text-pedra">{s.beneficio}</p>
                    <p className="mt-auto pt-6 text-sm font-semibold text-argila">Ver detalhes</p>
                  </div>
                </SpotlightCard>
              </Link>
            )
          })}
        </Stagger>
      </section>
      <Avaliacoes />
      <ChamadaFinal frase="Não sabe qual|é o seu caso?" mensagem="Olá, Kathleen! Não sei qual atendimento é o ideal para mim, pode me ajudar?" />
    </>
  )
}
