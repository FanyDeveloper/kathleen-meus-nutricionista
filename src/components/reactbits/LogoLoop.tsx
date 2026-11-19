// Recriação do LogoLoop (reactbits.dev) — faixa contínua de palavras
import { useRef } from 'react'
import { Sprout } from 'lucide-react'
import { gsap, useGSAP, MOTION_OK } from '../../lib/gsap'

type Props = { items: string[]; speed?: number; className?: string }

export default function LogoLoop({ items, speed = 40, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const track = ref.current!.querySelector<HTMLElement>('[data-track]')!
        const tween = gsap.to(track, { xPercent: -50, duration: speed, ease: 'none', repeat: -1 })
        const el = ref.current!
        const slow = () => gsap.to(tween, { timeScale: 0.2, duration: 0.6 })
        const go = () => gsap.to(tween, { timeScale: 1, duration: 0.6 })
        el.addEventListener('mouseenter', slow)
        el.addEventListener('mouseleave', go)
        return () => {
          el.removeEventListener('mouseenter', slow)
          el.removeEventListener('mouseleave', go)
        }
      })
    },
    { scope: ref },
  )

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={i} className="flex items-center gap-8 pr-8 font-display text-2xl italic md:text-4xl">
          {t}
          <Sprout aria-hidden className="h-5 w-5 shrink-0 text-argila" strokeWidth={1.25} />
        </li>
      ))}
    </ul>
  )

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div data-track className="flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
