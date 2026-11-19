import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { gsap, useGSAP, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { getLenis } from '../lib/lenis'
import Magnet from './reactbits/Magnet'
import StaggeredMenu from './reactbits/StaggeredMenu'
import { BotaoWhatsApp } from './ui/Botoes'
import Logo from './Logo'

export const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/servicos', label: 'Serviços' },
  { to: '/perguntas-frequentes', label: 'Dúvidas' },
  { to: '/contato', label: 'Contato' },
]

export default function Header() {
  const wrap = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const pill = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const { pathname } = useLocation()

  // --- Header: transparente -> pílula flutuante; esconde ao descer, volta ao subir
  useGSAP(
    () => {
      const el = bar.current!
      const dur = reducedMotion() ? 0 : 0.55
      let isPill = false
      const setPill = (v: boolean) => {
        if (v === isPill) return
        isPill = v
        el.classList.toggle('is-pill', v)
        const mobile = window.innerWidth < 768
        gsap.to(el, {
          maxWidth: v ? (mobile ? window.innerWidth - 24 : 1040) : window.innerWidth,
          marginTop: v ? 12 : 0,
          borderRadius: v ? 999 : 0,
          paddingTop: v ? 8 : 18,
          paddingBottom: v ? 8 : 18,
          backgroundColor: v ? 'rgba(246,241,233,0.78)' : 'rgba(246,241,233,0)',
          borderColor: v ? 'rgba(31,33,25,0.10)' : 'rgba(31,33,25,0)',
          boxShadow: v ? '0 12px 32px -18px rgba(31,33,25,0.35)' : '0 0 0 0 rgba(31,33,25,0)',
          duration: dur,
          ease: 'power3.out',
        })
      }
      gsap.set(el, { maxWidth: window.innerWidth })
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll()
          setPill(y > 80)
          if (openRef.current) return
          if (y > 260 && self.direction === 1) gsap.to(wrap.current, { yPercent: -140, duration: dur * 0.8, ease: 'power2.out', overwrite: 'auto' })
          else if (self.direction === -1 || y < 260) gsap.to(wrap.current, { yPercent: 0, duration: dur * 0.8, ease: 'power3.out', overwrite: 'auto' })
        },
      })
      const onResize = () => !isPill && gsap.set(el, { maxWidth: window.innerWidth })
      window.addEventListener('resize', onResize)
      return () => {
        st.kill()
        window.removeEventListener('resize', onResize)
      }
    },
    { scope: wrap },
  )

  // --- Indicador que desliza entre os links
  const moveTo = useCallback((target: HTMLElement | null) => {
    const p = pill.current
    if (!p) return
    if (!target) return gsap.to(p, { opacity: 0, duration: 0.25 })
    gsap.to(p, { x: target.offsetLeft, width: target.offsetWidth, opacity: 1, duration: 0.45, ease: 'expo.out' })
  }, [])
  const toActive = useCallback(() => moveTo(list.current?.querySelector<HTMLElement>('a.active') ?? null), [moveTo])

  useEffect(() => {
    const id = requestAnimationFrame(toActive)
    setOpen(false)
    return () => cancelAnimationFrame(id)
  }, [pathname, toActive])

  useEffect(() => {
    openRef.current = open
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const l = getLenis()
    if (open) {
      l?.stop()
      gsap.to(wrap.current, { yPercent: 0, duration: 0.3 })
    } else l?.start()
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      <header ref={wrap} className="fixed inset-x-0 top-0 z-50 flex justify-center">
        <div
          ref={bar}
          className="header-bar mx-auto flex w-full items-center justify-between border px-5 md:px-8"
          style={{ paddingTop: 18, paddingBottom: 18, borderColor: 'transparent' }}
        >
          <Link to="/" className="relative z-10 shrink-0" aria-label="Kathleen Meus Nutricionista, página inicial">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul ref={list} className="relative flex items-center gap-1" onMouseLeave={toActive}>
              <span ref={pill} aria-hidden className="absolute left-0 top-0 h-full rounded-full bg-tinta/[0.06] opacity-0" />
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onMouseEnter={(e) => moveTo(e.currentTarget)}
                    onFocus={(e) => moveTo(e.currentTarget)}
                    className="nav-link relative block rounded-full px-4 py-2 text-[15px] font-medium"
                  >
                    <span className="nav-link__in" data-text={l.label}>
                      <span>{l.label}</span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Magnet strength={0.25}>
                <BotaoWhatsApp className="btn-sm">Agendar</BotaoWhatsApp>
              </Magnet>
            </div>
            <button
              type="button"
              className={`burger lg:hidden ${open ? 'is-open' : ''}`}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <StaggeredMenu open={open} onClose={close} links={links} />
    </>
  )
}
