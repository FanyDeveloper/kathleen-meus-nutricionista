// Recriação do CountUp (reactbits.dev) — só para números reais
import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, reducedMotion } from '../../lib/gsap'

type Props = { to: number; decimals?: number; prefix?: string; suffix?: string; className?: string; duration?: number }

const fmt = (n: number, d: number) =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d })

export default function CountUp({ to, decimals = 0, prefix = '', suffix = '', className = '', duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reducedMotion()) return
      const obj = { v: 0 }
      el.textContent = prefix + fmt(0, decimals) + suffix
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () =>
          gsap.to(obj, {
            v: to,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = prefix + fmt(obj.v, decimals) + suffix
            },
          }),
      })
    },
    { scope: ref },
  )

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix + fmt(to, decimals) + suffix}
    </span>
  )
}
