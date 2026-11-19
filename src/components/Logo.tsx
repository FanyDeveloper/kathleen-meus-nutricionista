/** Assinatura tipográfica: nome em Fraunces + profissão em versalete */
export default function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <span className={`flex flex-col leading-none ${claro ? 'text-creme' : 'text-tinta'}`}>
      <span className="font-display text-[1.45rem] tracking-tight">
        Kathleen <em className={claro ? 'text-areia' : 'text-argila'}>Meus</em>
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] opacity-70">Nutricionista</span>
    </span>
  )
}
