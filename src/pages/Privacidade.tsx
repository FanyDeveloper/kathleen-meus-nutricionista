import { useSeo } from '../hooks/useSeo'
import { empresa } from '../data/empresa'

export default function Privacidade() {
  useSeo({
    title: 'Política de Privacidade',
    description: 'Como a nutricionista Kathleen Meus trata os dados enviados pelo site, conforme a Lei Geral de Proteção de Dados (LGPD).',
    path: '/politica-de-privacidade',
  })

  return (
    <article className="container-site max-w-3xl pb-24 pt-36 md:pb-32 md:pt-48">
      <h1 className="font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">Política de Privacidade</h1>
      <p className="mt-6 text-pedra">Última atualização: [CONFIRMAR: data de publicação]</p>

      <div className="prosa mt-12">
        <p>
          Esta política explica como {empresa.nome}, nutricionista ({empresa.crn}), com consultório na {empresa.endereco.rua},{' '}
          {empresa.endereco.bairro}, {empresa.endereco.cidade}/{empresa.endereco.uf}, trata os dados pessoais de quem visita este
          site, em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados, LGPD).
        </p>

        <h2>Quais dados coletamos</h2>
        <p>
          Pelo formulário de contato: nome, telefone, serviço de interesse e a mensagem que você escrever. Esses dados não ficam
          armazenados no site: ao clicar em enviar, eles são transferidos para o WhatsApp, no seu próprio aparelho, e só chegam à
          Kathleen se você confirmar o envio.
        </p>
        <p>
          Navegação: cookies essenciais para o funcionamento do site e para lembrar a sua escolha no aviso de cookies (salva no
          seu navegador). O mapa incorporado é fornecido pelo Google e pode definir cookies próprios, conforme a política de
          privacidade do Google.
        </p>

        <h2>Para que usamos</h2>
        <ul>
          <li>Responder seu contato e agendar consultas;</li>
          <li>Enviar informações sobre os serviços que você pediu;</li>
          <li>Manter o site funcionando com segurança.</li>
        </ul>
        <p>Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.</p>

        <h2>Base legal</h2>
        <p>
          O tratamento é feito com base no seu consentimento (art. 7º, I, da LGPD), dado ao marcar a caixa do formulário, e no
          legítimo interesse para responder a solicitações feitas por você.
        </p>

        <h2>Dados de saúde</h2>
        <p>
          Informações de saúde são dados sensíveis. Pedimos que você não as envie pelo formulário do site. Elas são tratadas
          apenas durante o atendimento, com sigilo profissional, conforme o Código de Ética do Nutricionista.
        </p>

        <h2>Por quanto tempo guardamos</h2>
        <p>
          As conversas de WhatsApp são mantidas pelo tempo necessário para o atendimento e o cumprimento de obrigações legais.
          [CONFIRMAR: prazo de retenção adotado]
        </p>

        <h2>Seus direitos</h2>
        <p>
          Você pode, a qualquer momento, pedir acesso, correção, anonimização ou exclusão dos seus dados, revogar o consentimento
          ou pedir informações sobre o uso deles. Basta enviar uma mensagem para {empresa.telefone} (WhatsApp)
          [CONFIRMAR: e-mail para assuntos de privacidade].
        </p>

        <h2>Cookies</h2>
        <p>
          Você pode aceitar ou recusar cookies não essenciais no aviso exibido na primeira visita. Também pode apagá-los nas
          configurações do seu navegador a qualquer momento.
        </p>

        <h2>Alterações</h2>
        <p>Esta política pode ser atualizada. A data no topo da página indica a versão em vigor.</p>
      </div>
    </article>
  )
}
