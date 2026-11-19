// Recriação do SpotlightCard (reactbits.dev) — luz suave que segue o cursor
import { useRef, type ReactNode, type MouseEvent } from 'react'

type Props = { children: ReactNode; className?: string; spotlight?: string }

export default function SpotlightCard({ children, className = '', spotlight = 'rgba(138, 75, 75, 0.14)' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight-card relative overflow-hidden ${className}`}
      style={{ ['--spot' as string]: spotlight }}
    >
      {children}
    </div>
  )
}
