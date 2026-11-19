// Recriação do StaggeredMenu (reactbits.dev) — menu de tela cheia com camadas e links em sequência
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Phone, MapPin, Instagram } from 'lucide-react'
import { gsap, useGSAP, reducedMotion } from '../../lib/gsap'
import { empresa } from '../../data/empresa'
import { waLink } from '../../lib/whatsapp'

type Props = { open: boolean; onClose: () => void; links: { to: string; label: string }[] }

export default function StaggeredMenu({ open, onClose, links }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      const fast = reducedMotion()
      gsap.set(ref.current, { autoAlpha: 0 })
      tl.current = gsap
        .timeline({ paused: true })
        .set(ref.current, { autoAlpha: 1 })
        .fromTo('[data-layer]', { yPercent: -100 }, { yPercent: 0, duration: fast ? 0.01 : 0.6, ease: 'expo.out', stagger: 0.08 })
        .fromTo('[data-link]', { yPercent: 110 }, { yPercent: 0, duration: fast ? 0.01 : 0.7, ease: 'expo.out', stagger: 0.05 }, '-=0.3')
        .fromTo('[data-foot]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: fast ? 0.01 : 0.5 }, '-=0.4')
    },
    { scope: ref },
  )

  useEffect(() => {
    if (!tl.current) return
    if (open) tl.current.timeScale(1).play()
    else tl.current.timeScale(1.8).reverse()
  }, [open])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  return (
    <div ref={ref} id="menu-mobile" className="fixed inset-0 z-40 lg:hidden" aria-hidden={!open} {...(!open ? { inert: "" } : {})}>
      <div data-layer className="absolute inset-0 bg-argila" />
      <div data-layer className="absolute inset-0 bg-oliva-escuro" />
      <div data-layer className="grain absolute inset-0 flex flex-col bg-creme px-6 pb-8 pt-28">
        <nav aria-label="Menu principal" className="flex-1">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.to} className="overflow-hidden">
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  onClick={onClose}
                  data-link
                  className={({ isActive }) =>
                    `block py-1 font-display text-[2.6rem] leading-tight tracking-tight ${isActive ? 'italic text-argila' : 'text-tinta'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div data-foot className="space-y-3 border-t border-tinta/15 pt-6 text-[15px] text-pedra">
          <a href={`tel:${empresa.telefoneLink}`} className="flex items-center gap-3">
            <Phone className="h-4 w-4" strokeWidth={1.5} /> {empresa.telefone}
          </a>
          <a href={empresa.mapsUrl} target="_blank" rel="noopener" className="flex items-center gap-3">
            <MapPin className="h-4 w-4" strokeWidth={1.5} /> {empresa.endereco.bairro}, {empresa.endereco.cidade}
          </a>
          {empresa.instagramUrl && (
            <a href={empresa.instagramUrl} target="_blank" rel="noopener" className="flex items-center gap-3">
              <Instagram className="h-4 w-4" strokeWidth={1.5} /> {empresa.instagram}
            </a>
          )}
          <a href={waLink()} target="_blank" rel="noopener" className="btn-primary mt-3 w-full justify-center">
            <span className="btn-fill" aria-hidden />
            <span className="relative">Agendar pelo WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
