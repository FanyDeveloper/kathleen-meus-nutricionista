// =============================================================
// TODOS os dados do negócio ficam aqui. Edite este arquivo para
// atualizar textos, contatos, horários, serviços e avaliações.
// Itens marcados com [CONFIRMAR] precisam ser validados com a cliente.
// =============================================================
import type { ImagemKey } from './imagens'

export const empresa = {
  nome: 'Kathleen Meus',
  profissao: 'Nutricionista',
  nomeCompleto: 'Kathleen Meus · Nutricionista',
  crn: '[CONFIRMAR: CRN-10 nº]',
  bio: 'Ajudo mulheres a emagrecer sem dietas restritivas e recuperar a confiança no próprio corpo.',
  mulheresAtendidas: 1000,
  metodo: 'Método RENOVA',
  local: '[CONFIRMAR: nome da clínica onde fica o consultório]',
  whatsapp: '5548992040449',
  telefone: '(48) 99204-0449',
  telefoneLink: '+5548992040449',
  instagram: '[CONFIRMAR: @instagram]',
  instagramUrl: '',
  site: 'https://www.kathleenmeus.com.br', // [CONFIRMAR: domínio final]
  endereco: {
    rua: 'Rua Luiz Elias Daux, 781',
    bairro: 'Ingleses Norte',
    cidade: 'Florianópolis',
    uf: 'SC',
    cep: '88058-512',
    plusCode: 'HH8X+48 Ingleses Norte, Florianópolis - SC',
    // [CONFIRMAR: coordenadas exatas — valores aproximados a partir do Plus Code]
    lat: -27.43465,
    lng: -48.40227,
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Rua+Luiz+Elias+Daux,+781+-+Ingleses+Norte,+Florian%C3%B3polis+-+SC,+88058-512',
  mapsEmbed:
    'https://www.google.com/maps?q=Rua+Luiz+Elias+Daux,+781+-+Ingleses+Norte,+Florian%C3%B3polis+-+SC&output=embed',
  horarios: [
    { dias: 'Segunda a sexta', horas: 'A partir das 07:30', obs: '[CONFIRMAR: horário de fechamento]' },
    { dias: 'Sábado', horas: '[CONFIRMAR]', obs: '' },
    { dias: 'Domingo', horas: 'Fechado', obs: '' },
  ],
  google: { nota: 5.0, avaliacoes: 35 },
  desenvolvedor: { nome: '[CONFIRMAR: nome do desenvolvedor]', url: '#' },
}

export type Servico = {
  slug: string
  nome: string
  resumo: string
  beneficio: string
  imagem: ImagemKey
  imagemAlt: string
  descricao: string[]
  paraQuem: string[]
  comoFunciona: { titulo: string; texto: string }[]
  faq: { p: string; r: string }[]
  seoTitulo: string
  seoDescricao: string
}

export const servicos: Servico[] = [
  {
    slug: 'metodo-renova',
    nome: 'Método RENOVA',
    resumo: 'Acompanhamento para mulheres que querem emagrecer sem dieta restritiva.',
    beneficio:
      'Você emagrece comendo comida de verdade e aprende a manter o resultado sem depender de força de vontade.',
    imagem: 'refeicao',
    imagemAlt: 'Prato com refeição saudável e colorida, com legumes, proteína e salada',
    descricao: [
      'O RENOVA é o jeito que a Kathleen encontrou de organizar tudo o que funciona no consultório: plano alimentar feito para a sua rotina, ajustes ao longo do caminho e muito diálogo. Nada de cardápio impossível ou lista de alimentos proibidos.',
      'O foco é emagrecer e, junto disso, fazer as pazes com a comida e com o espelho. Mais de mil mulheres já passaram pelo consultório, e o que elas mais comentam é que, pela primeira vez, a dieta coube na vida delas.',
      '[CONFIRMAR: duração do programa, número de consultas e o que está incluso no Método RENOVA]',
    ],
    paraQuem: [
      'Mulheres que já tentaram várias dietas e sempre voltam ao peso anterior',
      'Quem tem rotina corrida, filhos, trabalho e pouco tempo para cozinhar',
      'Quem sente culpa ao comer e quer uma relação mais leve com a comida',
      'Quem quer resultado com acompanhamento de perto, e não um PDF esquecido na gaveta',
    ],
    comoFunciona: [
      { titulo: 'Conversa inicial', texto: 'Entendemos sua história com a comida, seus horários, o que você gosta e o que já não funcionou.' },
      { titulo: 'Avaliação completa', texto: 'Medidas corporais, hábitos, exames (se houver) e objetivos realistas para o seu momento.' },
      { titulo: 'Plano que cabe na rotina', texto: 'Um plano alimentar com opções que você conhece e consegue preparar, inclusive para os fins de semana.' },
      { titulo: 'Ajustes e retornos', texto: 'Acompanhamos os resultados e ajustamos o que for preciso, sem julgamento.' },
    ],
    faq: [
      { p: 'Vou precisar cortar pão, doce ou arroz?', r: 'Não existe lista de proibidos. O plano é montado com o que você já come, em quantidades e combinações que funcionam para o seu objetivo.' },
      { p: 'Em quanto tempo vejo resultado?', r: 'Cada corpo responde de um jeito. Na consulta a Kathleen explica o que é realista para o seu caso, sem promessas milagrosas.' },
      { p: 'Qual o valor do Método RENOVA?', r: '[CONFIRMAR: valor e formas de pagamento]. Chame no WhatsApp para receber as condições atualizadas.' },
      { p: 'Posso fazer o RENOVA online?', r: '[CONFIRMAR: se há atendimento online]. Fale com a Kathleen para saber a melhor opção para você.' },
    ],
    seoTitulo: 'Método RENOVA · Emagrecimento feminino nos Ingleses, Florianópolis',
    seoDescricao:
      'Emagreça sem dieta restritiva com o Método RENOVA da nutricionista Kathleen Meus, nos Ingleses Norte, em Florianópolis. Plano feito para a sua rotina.',
  },
  {
    slug: 'plano-alimentar-personalizado',
    nome: 'Plano alimentar personalizado',
    resumo: 'Consulta nutricional com um plano feito a partir da sua rotina real.',
    beneficio: 'Um cardápio que você consegue seguir na segunda, na sexta e no almoço de domingo com a família.',
    imagem: 'cardapios',
    imagemAlt: 'Cardápios impressos de planos alimentares sobre a mesa do consultório',
    descricao: [
      'Plano alimentar bom é aquele que sai do papel. Por isso a consulta começa pela sua vida: que horas você acorda, onde almoça, o que tem na geladeira, quanto tempo sobra para cozinhar.',
      'A partir disso a Kathleen monta um plano com substituições, sugestões de preparo e orientações claras. [CONFIRMAR: especialidades atendidas, ex.: gestação, saúde intestinal, exames alterados]',
    ],
    paraQuem: [
      'Quem quer melhorar a alimentação sem mudar a vida inteira de uma vez',
      'Quem precisa de orientação por causa de exames alterados',
      'Quem treina e quer comer melhor para ter resultado',
      'Quem nunca foi a uma nutricionista e não sabe por onde começar',
    ],
    comoFunciona: [
      { titulo: 'Anamnese detalhada', texto: 'Uma conversa sem pressa sobre hábitos, saúde, preferências e rotina.' },
      { titulo: 'Medidas e objetivos', texto: 'Avaliação corporal e definição de metas possíveis.' },
      { titulo: 'Entrega do plano', texto: 'Plano alimentar com opções de substituição e orientações práticas. [CONFIRMAR: prazo de entrega]' },
      { titulo: 'Retorno', texto: 'Reavaliamos e ajustamos o plano conforme sua evolução. [CONFIRMAR: intervalo entre retornos]' },
    ],
    faq: [
      { p: 'Quanto custa a consulta?', r: '[CONFIRMAR: valor da consulta]. Pelo WhatsApp você recebe os valores e os horários disponíveis.' },
      { p: 'Aceita plano de saúde?', r: '[CONFIRMAR: convênios aceitos ou emissão de recibo para reembolso].' },
      { p: 'Preciso levar exames?', r: 'Se tiver exames recentes, leve. Se não tiver, a Kathleen avalia se vale a pena pedir.' },
    ],
    seoTitulo: 'Plano alimentar personalizado · Nutricionista nos Ingleses, Florianópolis',
    seoDescricao:
      'Consulta com nutricionista nos Ingleses Norte, Florianópolis: plano alimentar personalizado, feito para a sua rotina, com acompanhamento.',
  },
  {
    slug: 'avaliacao-corporal',
    nome: 'Avaliação corporal',
    resumo: 'Medidas, dobras cutâneas e composição corporal para acompanhar a evolução.',
    beneficio: 'Você enxerga o que a balança não mostra: perda de gordura, ganho de massa e mudança nas medidas.',
    imagem: 'avaliacao-corporal',
    imagemAlt: 'Maleta com adipômetro, fita métrica e instrumentos de avaliação corporal no consultório',
    descricao: [
      'A balança conta só uma parte da história. Na avaliação corporal a Kathleen mede circunferências e dobras cutâneas para estimar a composição do seu corpo: quanto é gordura e quanto é massa magra.',
      'Essas medidas são repetidas nos retornos, e é aí que muita gente percebe que está no caminho certo mesmo quando o peso parece parado.',
    ],
    paraQuem: [
      'Quem quer acompanhar a evolução de forma objetiva',
      'Quem treina e quer saber se está ganhando massa',
      'Quem fica desanimada quando o peso não muda',
    ],
    comoFunciona: [
      { titulo: 'Medidas', texto: 'Peso, altura e circunferências em pontos padronizados.' },
      { titulo: 'Dobras cutâneas', texto: 'Uso de adipômetro para estimar o percentual de gordura.' },
      { titulo: 'Leitura dos resultados', texto: 'Tudo explicado em linguagem simples, junto com o seu objetivo.' },
    ],
    faq: [
      { p: 'A avaliação é feita separada da consulta?', r: '[CONFIRMAR: se a avaliação está inclusa na consulta ou é avulsa].' },
      { p: 'Precisa de alguma preparação?', r: 'Venha com roupa confortável. [CONFIRMAR: orientações de preparo, como jejum ou hidratação].' },
    ],
    seoTitulo: 'Avaliação corporal · Nutricionista nos Ingleses, Florianópolis',
    seoDescricao:
      'Avaliação corporal com nutricionista nos Ingleses Norte, Florianópolis: medidas, dobras cutâneas e acompanhamento da evolução.',
  },
  {
    slug: 'palestras-e-workshops',
    nome: 'Palestras e workshops',
    resumo: 'Conversas sobre alimentação para empresas, academias e grupos.',
    beneficio: 'Informação clara e aplicável para a sua equipe ou comunidade comer melhor no dia a dia.',
    imagem: 'kathleen-seminario',
    imagemAlt: 'Kathleen Meus apresentando um seminário para um grupo de mulheres',
    descricao: [
      'A Kathleen leva para as palestras o mesmo jeito do consultório: direto, sem terrorismo nutricional e com exemplos do cotidiano.',
      'Os temas são adaptados ao público, de alimentação no trabalho a emagrecimento feminino e organização da rotina alimentar. [CONFIRMAR: temas e formatos oferecidos]',
    ],
    paraQuem: [
      'Empresas que querem cuidar da saúde dos colaboradores',
      'Academias, studios e grupos de corrida',
      'Eventos e encontros voltados para mulheres',
    ],
    comoFunciona: [
      { titulo: 'Briefing', texto: 'Entendemos o público, o objetivo e o formato do encontro.' },
      { titulo: 'Conteúdo sob medida', texto: 'Tema e linguagem adaptados para quem vai assistir.' },
      { titulo: 'No dia', texto: 'Palestra com espaço para perguntas. [CONFIRMAR: materiais de apoio]' },
    ],
    faq: [
      { p: 'Atende fora dos Ingleses?', r: '[CONFIRMAR: regiões atendidas para palestras].' },
      { p: 'Qual a duração?', r: '[CONFIRMAR: duração média das palestras e workshops].' },
    ],
    seoTitulo: 'Palestras sobre nutrição para empresas · Florianópolis',
    seoDescricao:
      'Palestras e workshops de nutrição com Kathleen Meus para empresas, academias e grupos em Florianópolis.',
  },
]

// Avaliações reais do Google (somente primeiro nome)
export const avaliacoes = [
  {
    nome: 'Juliana',
    nota: 5,
    quando: '3 meses atrás',
    texto:
      'Profissional excepcional! O grande diferencial foi elaborar um plano alimentar totalmente adaptado à minha rotina e à minha realidade, algo que poucos profissionais fazem. Além de muito competente, é extremamente acolhedora, não julga, ensina com clareza e acompanha todo o processo com atenção e cuidado. Recomendo de olhos fechados!',
  },
  {
    nome: 'Jeane',
    nota: 5,
    quando: '3 meses atrás',
    texto:
      'Com a Kathleen é muito mais do que só uma dieta, com ela não tem nada mirabolante ou prescrições difíceis de seguir. Ela se preocupa com os detalhes da tua rotina, esclarece as dúvidas e está sempre disposta a buscar a melhor solução pra…',
  },
  {
    nome: 'Marcelo',
    nota: 5,
    quando: '3 meses atrás',
    texto:
      'Atendimento muito bom e profissional, bem atenciosa e gentil sem deixar de ser criteriosa e eficiente. Estou gostando muito do resultado e acompanhamento.',
  },
]

// Trechos destacados pelo próprio Google a partir das avaliações
export const trechos = [
  'Combinação poderosa para bons resultados.',
  'Ótimo ambiente, atendimento excelente!',
  'Kathleen, seu trabalho é sensacional, você é uma excelente profissional!',
]

export const faqGeral = [
  { p: 'Quanto custa a consulta?', r: '[CONFIRMAR: valor da consulta e do Método RENOVA]. Mande uma mensagem no WhatsApp que a gente envia os valores atualizados e os horários livres.' },
  { p: 'Como faço para agendar?', r: 'Pelo WhatsApp (48) 99204-0449 ou pelo formulário da página de contato. Você escolhe o horário e recebe a confirmação por mensagem.' },
  { p: 'Onde fica o consultório? Tem estacionamento?', r: 'Na Rua Luiz Elias Daux, 781, nos Ingleses Norte, em Florianópolis. [CONFIRMAR: informações de estacionamento].' },
  { p: 'Quais as formas de pagamento?', r: '[CONFIRMAR: Pix, cartão, parcelamento].' },
  { p: 'Aceita plano de saúde?', r: '[CONFIRMAR: convênios ou recibo para reembolso].' },
  { p: 'Vou passar fome ou ter que cortar tudo o que gosto?', r: 'Não. O trabalho da Kathleen é justamente o contrário: montar um plano com comida de verdade, que caiba na sua rotina e no seu paladar, sem dieta restritiva.' },
  { p: 'Atende online?', r: '[CONFIRMAR: se há consulta online e para quais cidades].' },
  { p: 'Posso tirar dúvidas entre as consultas?', r: '[CONFIRMAR: como funciona o suporte entre consultas, ex.: WhatsApp em horário comercial].' },
]
