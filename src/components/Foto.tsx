// Foto com tratamento de cor único, revelação por clip-path e parallax leve
import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap'
import { imagens, type ImagemKey } from '../data/imagens'

type Props = {
  img: ImagemKey
  alt: string
  className?: string
  /** primeira dobra: sem lazy e com prioridade */
  prioridade?: boolean
  parallax?: boolean
  revelar?: boolean
  posicao?: string
}

export default function Foto({ img, alt, className = '', prioridade, parallax = true, revelar = true, posicao = 'center' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const im = imagens[img]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const el = ref.current!
        const pic = el.querySelector('img')!
        if (revelar && !prioridade) {
          gsap.fromTo(
            el,
            { clipPath: 'inset(18% 8% 18% 8% round var(--radius))' },
            {
              clipPath: 'inset(0% 0% 0% 0% round var(--radius))',
              duration: 1.3,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%' },
            },
          )
        }
        if (parallax) {
          gsap.fromTo(
            pic,
            { yPercent: -6 },
            { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        }
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={`relative overflow-hidden rounded-[var(--radius)] bg-areia ${className}`}>
      <img
        src={im.src}
        width={im.width}
        height={im.height}
        alt={alt}
        loading={prioridade ? 'eager' : 'lazy'}
        fetchPriority={prioridade ? 'high' : undefined}
        decoding="async"
        className={`foto h-full w-full object-cover ${parallax ? 'scale-[1.14]' : ''}`}
        style={{ objectPosition: posicao }}
      />
    </div>
  )
}
