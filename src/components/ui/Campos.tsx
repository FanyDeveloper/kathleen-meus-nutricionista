// Inputs com label flutuante (estilo Uiverse), checkbox animado e loader
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

type Base = { label: string; erro?: string; id: string }

export function CampoTexto({ label, erro, id, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="campo">
      <input id={id} placeholder=" " aria-invalid={!!erro} aria-describedby={erro ? `${id}-erro` : undefined} {...rest} />
      <label htmlFor={id}>{label}</label>
      {erro && <p id={`${id}-erro`} className="campo__erro">{erro}</p>}
    </div>
  )
}

export function CampoArea({ label, erro, id, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="campo">
      <textarea id={id} placeholder=" " rows={4} aria-invalid={!!erro} aria-describedby={erro ? `${id}-erro` : undefined} {...rest} />
      <label htmlFor={id}>{label}</label>
      {erro && <p id={`${id}-erro`} className="campo__erro">{erro}</p>}
    </div>
  )
}

export function CampoSelect({ label, erro, id, children, ...rest }: Base & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="campo campo--select">
      <select id={id} aria-invalid={!!erro} aria-describedby={erro ? `${id}-erro` : undefined} {...rest}>
        {children}
      </select>
      <label htmlFor={id}>{label}</label>
      {erro && <p id={`${id}-erro`} className="campo__erro">{erro}</p>}
    </div>
  )
}

export function CheckboxConsentimento({ id, checked, onChange, erro, children }: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  erro?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="check">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={!!erro} />
        <span className="check__box" aria-hidden>
          <svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5l3 3 6-7" /></svg>
        </span>
        <span className="text-[15px] leading-relaxed text-pedra">{children}</span>
      </label>
      {erro && <p className="campo__erro">{erro}</p>}
    </div>
  )
}

export function Loader({ label = 'Enviando' }: { label?: string }) {
  return (
    <span className="loader" role="status" aria-label={label}>
      <span /><span /><span />
    </span>
  )
}
