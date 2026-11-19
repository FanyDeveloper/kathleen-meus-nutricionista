import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, useGSAP, reducedMotion } from '../lib/gsap'
import { waLink, msgServico } from '../lib/whatsapp'
import { servicos } from '../data/empresa'

function mensagemDaPagina(path: string) {
  const s = servicos.find((x) => path === `/servicos/${x.slug}`)
  if (s) return msgServico(s.nome)
  if (path.startsWith('/contato')) return 'Olá, Kathleen! Gostaria de agendar uma consulta.'
  if (path.startsWith('/perguntas')) return 'Olá! Estava lendo as dúvidas no site e queria tirar mais uma.'
  return undefined
}

/** Ícone do WhatsApp desenhado em traço fino, coerente com o Lucide */
function IconeWhats() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 md:h-9 md:w-9" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3.5 20.5l1.2-4.3A8.5 8.5 0 1 1 8 19.4l-4.5 1.1z" />
      <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.5.4-2.6-.1a9.6 9.6 0 0 1-4.6-4.6c-.5-1.1-.4-2-.1-2.7z" />
    </svg>
  )
}

export default function WhatsAppFlutuante() {
  const ref = useRef<HTMLAnchorElement>(null)
  const { pathname } = useLocation()

  useGSAP(() => {
    if (reducedMotion()) return
    gsap.from(ref.current, { scale: 0.6, opacity: 0, y: 20, duration: 0.8, delay: 1.6, ease: 'expo.out' })
  })

  return (
    <a
      ref={ref}
      href={waLink(mensagemDaPagina(pathname))}
      target="_blank"
      rel="noopener"
      aria-label="Conversar com a Kathleen no WhatsApp"
      className="wa-float fixed bottom-4 right-4 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-oliva text-creme md:bottom-8 md:right-8 md:h-[76px] md:w-[76px]"
    >
      <IconeWhats />
    </a>
  )
}
