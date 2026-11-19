// Recriação do ShinyText (reactbits.dev) — brilho discreto, só em detalhes curtos
type Props = { text: string; className?: string }

export default function ShinyText({ text, className = '' }: Props) {
  return <span className={`shiny-text ${className}`}>{text}</span>
}
