// Recriação do SplitText (reactbits.dev) — revela palavra por palavra com máscara
import { useRef, type ElementType } from 'react'
import { gsap, useGSAP, MOTION_OK } from '../../lib/gsap'

type Props = {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  /** palavras que recebem destaque em itálico/cor */
  highlight?: string[]
}

export default function SplitText({ text, as: Tag = 'h1', className = '', delay = 0, stagger = 0.06, highlight = [] }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('[data-word]', { yPercent: 115, duration: 0.9, ease: 'expo.out', stagger, delay })
      })
    },
    { scope: ref },
  )

  const words = text.split(' ')
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <span
            data-word
            className={`inline-block will-change-transform ${highlight.includes(w.replace(/[.,]/g, '')) ? 'italic text-argila' : ''}`}
          >
            {w}
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}
