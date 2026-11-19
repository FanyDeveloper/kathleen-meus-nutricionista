import { empresa } from '../data/empresa'

export const MSG_PADRAO = 'Olá, Kathleen! Vi seu site e gostaria de agendar uma consulta.'

export function waLink(mensagem: string = MSG_PADRAO) {
  return `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export const msgServico = (nome: string) =>
  `Olá! Vi no site o serviço de ${nome} e gostaria de mais informações.`
