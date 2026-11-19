// Recriação do ClickSpark (reactbits.dev) — faíscas finas no clique, em cor da paleta
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap, reducedMotion } from '../../lib/gsap'

type Props = { children: ReactNode; color?: string; count?: number; className?: string }

export default function ClickSpark({ children, color = 'var(--color-argila)', count = 8, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  const onClick = (e: MouseEvent) => {
    const host = ref.current
    if (!host || reducedMotion()) return
    const r = host.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span')
      const angle = (360 / count) * i
      Object.assign(s.style, {
        position: 'absolute', left: `${x}px`, top: `${y}px`, width: '10px', height: '1.5px',
        background: color, transformOrigin: '0 50%', pointerEvents: 'none', borderRadius: '2px',
      })
      host.appendChild(s)
      gsap.fromTo(
        s,
        { rotate: angle, x: 0, scaleX: 1, opacity: 1 },
        {
          x: Math.cos((angle * Math.PI) / 180) * 22,
          y: Math.sin((angle * Math.PI) / 180) * 22,
          scaleX: 0.2, opacity: 0, duration: 0.5, ease: 'power3.out',
          onComplete: () => s.remove(),
        },
      )
    }
  }

  return (
    <span ref={ref} onClickCapture={onClick} className={`relative inline-block ${className}`}>
      {children}
    </span>
  )
}
