// Botões inspirados nos padrões mais populares do Uiverse, adaptados à paleta
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import ClickSpark from '../reactbits/ClickSpark'
import { waLink } from '../../lib/whatsapp'

/** Primário: preenchimento que sobe no hover + seta que troca de lugar */
export function BotaoWhatsApp({ children = 'Agendar pelo WhatsApp', mensagem, className = '', escuro = false }: {
  children?: ReactNode
  mensagem?: string
  className?: string
  escuro?: boolean
}) {
  return (
    <ClickSpark>
      <a
        href={waLink(mensagem)}
        target="_blank"
        rel="noopener"
        className={`btn-primary ${escuro ? 'btn-primary--claro' : ''} ${className}`}
      >
        <span className="btn-fill" aria-hidden />
        <span className="relative">{children}</span>
        <span className="btn-arrow relative" aria-hidden>
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
        </span>
      </a>
    </ClickSpark>
  )
}

/** Secundário: texto com sublinhado que se desenha e seta que avança */
export function LinkSecundario({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={`link-sec group ${className}`}>
      <span className="link-sec__txt">{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
    </Link>
  )
}
