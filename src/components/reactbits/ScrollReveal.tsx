// Recriação do ScrollReveal (reactbits.dev) — palavras ganham opacidade conforme a rolagem
import { useRef } from 'react'
import { gsap, useGSAP, MOTION_OK } from '../../lib/gsap'

type Props = { children: string; className?: string }

export default function ScrollReveal({ children, className = '' }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '[data-w]',
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.05,
            scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <p ref={ref} className={className}>
      {children.split(' ').map((w, i) => (
        <span key={i} data-w className="inline">
          {w}{' '}
        </span>
      ))}
    </p>
  )
}
