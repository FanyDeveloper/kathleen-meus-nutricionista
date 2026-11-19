// Título de seção revelado linha a linha por máscara. Use "|" para quebrar linhas.
import { useRef, type ElementType } from 'react'
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap'

type Props = { text: string; as?: ElementType; className?: string; italic?: number[] }

export default function MaskTitle({ text, as: Tag = 'h2', className = '', italic = [] }: Props) {
  const ref = useRef<HTMLElement>(null)
  const lines = text.split('|')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('[data-line]', {
          yPercent: 110,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        })
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={`font-display tracking-tight ${className}`} aria-label={lines.join(' ')}>
      {lines.map((l, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <span data-line className={`block will-change-transform ${italic.includes(i) ? 'italic text-argila' : ''}`}>
            {l}
          </span>
        </span>
      ))}
    </Tag>
  )
}
