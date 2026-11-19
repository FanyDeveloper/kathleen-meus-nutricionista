import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'km-cookies'

function ler() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}
function salvar(v: string) {
  try {
    localStorage.setItem(KEY, v)
  } catch {
    /* navegação privada: segue sem salvar */
  }
}

export default function BannerCookies() {
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisivel(!ler()), 1200)
    return () => clearTimeout(t)
  }, [])
  if (!visivel) return null

  const decidir = (v: 'aceito' | 'recusado') => {
    salvar(v)
    setVisivel(false)
  }

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="cookie fixed bottom-20 left-3 right-3 z-40 rounded-[var(--radius)] border border-tinta/10 bg-creme p-5 shadow-[0_18px_40px_-24px_rgba(31,33,25,.5)] md:bottom-6 md:left-6 md:right-auto md:max-w-sm"
    >
      <p className="text-[15px] leading-relaxed text-pedra">
        Este site usa cookies essenciais e o mapa do Google para funcionar.{' '}
        <Link to="/politica-de-privacidade" className="underline underline-offset-4 hover:text-argila">
          Saiba mais
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => decidir('aceito')} className="rounded-full bg-oliva px-5 py-2 text-sm font-semibold text-creme transition-colors hover:bg-oliva-escuro">
          Aceitar
        </button>
        <button type="button" onClick={() => decidir('recusado')} className="rounded-full border border-tinta/20 px-5 py-2 text-sm font-semibold text-tinta transition-colors hover:border-tinta/50">
          Recusar
        </button>
      </div>
    </div>
  )
}
