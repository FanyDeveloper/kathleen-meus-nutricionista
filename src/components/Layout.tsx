import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { gsap, useGSAP, ScrollTrigger, reducedMotion } from '../lib/gsap'
import { initLenis, destroyLenis, scrollToTop } from '../lib/lenis'
import Header from './Header'
import Footer from './Footer'
import WhatsAppFlutuante from './WhatsAppFlutuante'
import BannerCookies from './BannerCookies'

export default function Layout() {
  const { pathname } = useLocation()
  const main = useRef<HTMLElement>(null)

  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  // Topo a cada troca de página
  useLayoutEffect(() => {
    scrollToTop()
  }, [pathname])

  // Transição suave entre páginas + recalcula os triggers
  useGSAP(
    () => {
      gsap.fromTo(
        main.current,
        { opacity: 0, y: reducedMotion() ? 0 : 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform' },
      )
      const t = setTimeout(() => ScrollTrigger.refresh(), 400)
      return () => clearTimeout(t)
    },
    { dependencies: [pathname] },
  )

  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" ref={main} key={pathname}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFlutuante />
      <BannerCookies />
    </>
  )
}
