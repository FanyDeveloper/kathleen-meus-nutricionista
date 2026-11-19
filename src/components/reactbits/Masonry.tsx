// Recriação do Masonry (reactbits.dev) — colunas com entrada em sequência e zoom no hover
import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '../../lib/gsap'
import { imagens, type ImagemKey } from '../../data/imagens'

export type MasonryItem = { img: ImagemKey; alt: string; legenda?: string }

export default function Masonry({ items }: { items: MasonryItem[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('[data-tile]', {
          y: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="columns-2 gap-3 md:columns-3 md:gap-5">
      {items.map((it) => {
        const im = imagens[it.img]
        return (
          <figure key={it.img} data-tile className="group mb-3 break-inside-avoid md:mb-5">
            <div className="overflow-hidden rounded-[var(--radius)] bg-areia">
              <img
                src={im.src}
                width={im.width}
                height={im.height}
                alt={it.alt}
                loading="lazy"
                decoding="async"
                className="foto h-auto w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
              />
            </div>
            {it.legenda && <figcaption className="mt-2 text-sm text-pedra">{it.legenda}</figcaption>}
          </figure>
        )
      })}
    </div>
  )
}
