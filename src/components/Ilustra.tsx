// Ilustrações de alimentos em traço (fundo transparente), com flutuação e sombra de profundidade
const tamanhos = {
  salada: [480, 400],
  alface: [390, 400],
  berinjela: [360, 305],
  rabanete: [330, 495],
  aspargos: [380, 460],
} as const

export type IlustraNome = keyof typeof tamanhos

type Props = { nome: IlustraNome; cor?: 'oliva' | 'creme'; className?: string; atraso?: number; girar?: number }

export default function Ilustra({ nome, cor = 'oliva', className = '', atraso = 0, girar = 0 }: Props) {
  const [w, h] = tamanhos[nome]
  return (
    <span aria-hidden className={`pointer-events-none block ${className}`} style={{ rotate: `${girar}deg` }}>
      <img
        src={`/img/ilustra-${nome}-${cor}.webp`}
        width={w}
        height={h}
        alt=""
        loading="lazy"
        decoding="async"
        className={`ilustra h-auto w-full ${cor === 'creme' ? 'ilustra--clara' : ''}`}
        style={{ animationDelay: `${atraso}s` }}
      />
    </span>
  )
}
