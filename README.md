# Site · Kathleen Meus, Nutricionista (Ingleses, Florianópolis)

React + Vite + TypeScript + Tailwind v4 · React Router · GSAP + ScrollTrigger (`@gsap/react`) · Lenis · Lucide.

## Rodar

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera /dist
npm run preview    # testa o build
npm run images     # reconverte as fotos de /images para WebP em /public/img
```

Deploy: Vercel (`vercel.json`) ou Netlify (`public/_redirects`) — ambos já redirecionam as rotas para o SPA.

## Onde editar

- **Todos os dados**: `src/data/empresa.ts` (contato, horários, serviços, FAQ, avaliações).
- Cores e fontes: `src/index.css` (bloco `@theme`).
- SEO global + JSON-LD: `index.html`. Sitemap: `public/sitemap.xml`. Domínio: troque `kathleenmeus.com.br` em `empresa.ts`, `index.html`, `robots.txt` e `sitemap.xml`.

## Pendências [CONFIRMAR]

1. Horário de fechamento (seg–sex) e sábados — o JSON-LD do `index.html` usa 19:00 como provisório.
2. Número do CRN-10.
3. Formação, ano e especializações da Kathleen (página Sobre).
4. Valor da consulta e do Método RENOVA; formas de pagamento; convênios/reembolso.
5. Detalhes do Método RENOVA (duração, nº de consultas, o que inclui).
6. Atendimento online (sim/não, para onde).
7. Estacionamento.
8. Nome da clínica onde fica o consultório (fotos mostram "Clínica do Movimento" / "Carpe Vita").
9. Instagram (o ícone só aparece quando `instagramUrl` for preenchido).
10. Coordenadas exatas (lat/lng aproximadas pelo Plus Code).
11. Domínio final do site.
12. Especialidades atendidas no plano alimentar; prazo de entrega do plano e intervalo dos retornos.
13. Avaliação corporal: inclusa na consulta ou avulsa; preparo necessário.
14. Palestras: temas, duração, regiões atendidas, materiais.
15. Suporte entre consultas (ex.: WhatsApp).
16. Política de Privacidade: data de publicação, prazo de retenção e e-mail para privacidade.
17. Nome/link do desenvolvedor no rodapé.
