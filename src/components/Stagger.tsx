// Entrada em sequência para listas e cards ao entrar na tela
import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCED } from '../lib/gsap'

type Props = { children: ReactNode; as?: ElementType; className?: string; y?: number }

export default function Stagger({ children, as: Tag = 'div', className = '', y = 40 }: Props) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const items = () => ref.current!.querySelectorAll(':scope > *')
      mm.add(MOTION_OK, () => {
        gsap.from(items(), {
          y,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        })
      })
      mm.add(MOTION_REDUCED, () => {
        gsap.from(items(), { opacity: 0, duration: 0.4, scrollTrigger: { trigger: ref.current, start: 'top 90%' } })
      })
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
