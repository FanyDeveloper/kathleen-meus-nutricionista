// Recriação do TiltedCard (reactbits.dev) — o cartão inclina em 3D seguindo o cursor
// e os filhos marcados com .depth-* "saltam" para fora em camadas.
import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, reducedMotion } from '../../lib/gsap'

type Props = { children: ReactNode; className?: string; cardClass?: string; max?: number }

export default function TiltedCard({ children, className = '', cardClass = '', max = 8 }: Props) {
  const outer = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)

  useGSAP(
    (_, contextSafe) => {
      if (reducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
      const el = outer.current!
      const rx = gsap.quickTo(card.current, 'rotationX', { duration: 0.7, ease: 'power3.out' })
      const ry = gsap.quickTo(card.current, 'rotationY', { duration: 0.7, ease: 'power3.out' })
      const move = contextSafe!((e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        ry(x * max * 2)
        rx(-y * max * 2)
      })
      const leave = contextSafe!(() => {
        rx(0)
        ry(0)
      })
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      return () => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      }
    },
    { scope: outer },
  )

  return (
    <div ref={outer} className={`[perspective:1100px] ${className}`}>
      <div ref={card} className={`tilt-card relative h-full rounded-[var(--radius)] [transform-style:preserve-3d] ${cardClass}`}>
        {children}
      </div>
    </div>
  )
}
