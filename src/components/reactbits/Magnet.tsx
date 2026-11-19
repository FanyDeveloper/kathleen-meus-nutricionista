// Recriação do Magnet (reactbits.dev) — o elemento é atraído pelo cursor
import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, reducedMotion } from '../../lib/gsap'

type Props = { children: ReactNode; strength?: number; padding?: number; className?: string }

export default function Magnet({ children, strength = 0.35, padding = 60, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current
      if (!el || reducedMotion() || !window.matchMedia('(hover: hover)').matches) return
      const inner = el.firstElementChild as HTMLElement
      const xTo = gsap.quickTo(inner, 'x', { duration: 0.6, ease: 'power3.out' })
      const yTo = gsap.quickTo(inner, 'y', { duration: 0.6, ease: 'power3.out' })
      const move = contextSafe!((e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const near = Math.abs(dx) < r.width / 2 + padding && Math.abs(dy) < r.height / 2 + padding
        xTo(near ? dx * strength : 0)
        yTo(near ? dy * strength : 0)
      })
      window.addEventListener('mousemove', move)
      return () => window.removeEventListener('mousemove', move)
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <div className="will-change-transform">{children}</div>
    </div>
  )
}
