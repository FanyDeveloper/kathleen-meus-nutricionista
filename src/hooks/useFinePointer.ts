import { useEffect, useState } from 'react'

/** true quando há mouse com hover real — usado para desligar efeitos no toque */
export function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setFine(mq.matches)
    const fn = (e: MediaQueryListEvent) => setFine(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return fine
}
