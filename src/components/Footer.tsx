import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MapPin, Instagram, MessageCircle } from 'lucide-react'
import { gsap, useGSAP, MOTION_OK } from '../lib/gsap'
import { empresa, servicos } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import Logo from './Logo'
import { links } from './Header'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from('[data-foot-in]', {
          y: 50,
          opacity: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        })
      })
    },
    { scope: ref },
  )

  const ano = new Date().getFullYear()
  return (
    <footer ref={ref} className="grain relative overflow-hidden bg-oliva-escuro text-creme">
      <div className="container-site pb-28 pt-20 md:pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div data-foot-in className="md:col-span-5">
            <Logo claro />
            <p className="mt-6 max-w-sm text-creme/75">
              Nutrição para mulheres que querem emagrecer sem dieta restritiva. Consultório nos {empresa.endereco.bairro},{' '}
              {empresa.endereco.cidade}.
            </p>
            <p className="mt-2 text-sm text-creme/60">{empresa.crn}</p>
          </div>

          <nav data-foot-in aria-label="Rodapé" className="md:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-creme/55">Páginas</h2>
            <ul className="mt-4 space-y-2">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="foot-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-foot-in className="md:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-creme/55">Serviços</h2>
            <ul className="mt-4 space-y-2">
              {servicos.map((s) => (
                <li key={s.slug}>
                  <Link to={`/servicos/${s.slug}`} className="foot-link">{s.nome}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-foot-in className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-creme/55">Contato</h2>
            <ul className="mt-4 space-y-3 text-creme/85">
              <li>
                <a href={waLink()} target="_blank" rel="noopener" className="foot-link inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${empresa.telefoneLink}`} className="foot-link inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" strokeWidth={1.5} /> {empresa.telefone}
                </a>
              </li>
              <li>
                <a href={empresa.mapsUrl} target="_blank" rel="noopener" className="foot-link inline-flex items-start gap-2">
                  <MapPin className="mt-1 h-4 w-4 shrink-0" strokeWidth={1.5} />
                  <span>{empresa.endereco.rua}, {empresa.endereco.bairro}</span>
                </a>
              </li>
              {empresa.instagramUrl && (
                <li>
                  <a href={empresa.instagramUrl} target="_blank" rel="noopener" className="foot-link inline-flex items-center gap-2">
                    <Instagram className="h-4 w-4" strokeWidth={1.5} /> {empresa.instagram}
                  </a>
                </li>
              )}
            </ul>
            <ul className="mt-5 space-y-1 text-sm text-creme/65">
              {empresa.horarios.map((h) => (
                <li key={h.dias}>{h.dias}: {h.horas}</li>
              ))}
            </ul>
          </div>
        </div>

        <p data-foot-in aria-hidden className="mt-16 select-none whitespace-nowrap font-display text-[14.5vw] leading-[0.85] tracking-tighter text-creme/[0.12] md:text-[10.5vw] xl:text-[9.5rem]">
          Kathleen Meus
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-creme/15 pt-6 text-sm text-creme/60 md:flex-row md:justify-between">
          <p>© {ano} {empresa.nome} · Nutricionista em {empresa.endereco.cidade}</p>
          <div className="flex gap-6">
            <Link to="/politica-de-privacidade" className="foot-link">Política de Privacidade</Link>
            <a href={empresa.desenvolvedor.url} className="foot-link">Site por {empresa.desenvolvedor.nome}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
