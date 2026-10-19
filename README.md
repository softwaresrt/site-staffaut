# StaffAut — Experiência Premium

Website completo em **Next.js App Router + React 19 + TypeScript + Tailwind CSS 4**, com identidade visual restrita a branco, preto e laranja. Inclui WebGL autoral, GSAP ScrollTrigger + Lenis, Motion for React, vitrine interativa com oito funcionários e simulação de fluxo com dados fictícios claramente identificados.

## Como visualizar imediatamente

Abra `preview.html` no navegador. É uma **prévia interativa independente**, com o layout, os cinco retratos, filtros de funcionários, cenários de demonstração, FAQ, navegação e shader. Não exige instalação. O formulário nessa prévia *não envia dados*; a integração de produção pertence à aplicação Next.js.

## Como rodar a aplicação

Requisitos: Node.js 20.9+ (recomendado 22), npm e acesso à internet para instalar as dependências.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`. Para checar a versão de produção, use `npm run typecheck`, `npm run lint` e `npm run build` após instalar as dependências.

> Nota honesta: a instalação/build da aplicação Next.js não pôde ser realizada neste ambiente porque o registro npm não estava acessível. A prévia HTML/CSS/JS foi validada com Chromium em desktop e mobile. O projeto Next.js precisa passar pelos comandos acima no seu ambiente antes do deploy.

## Configurações obrigatórias antes da publicação

Copie `.env.example` para `.env.local` e preencha:

| Variável | Função |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp **real** com DDI e DDD (somente dígitos). Gera link `wa.me` seguro. Sem número, o botão mostra aviso e direciona ao formulário, sem inventar contato. |
| `RESEND_API_KEY` | Chave do Resend para entregar novos leads por e-mail. Armazenada apenas no servidor. |
| `LEADS_TO_EMAIL` | Endereço oficial que receberá as solicitações. |
| `LEADS_FROM_EMAIL` | Remetente autenticado/verificado pelo Resend. |
| `NEXT_PUBLIC_SITE_URL` | Domínio oficial de publicação, usado em `sitemap.xml` e `robots.txt`. |

O formulário real utiliza `/api/lead`, valida campos e consentimento, inclui campo anti-spam e responde a erros. Se o Resend não estiver configurado, **não alega envio realizado**: a interface mostra uma falha explicativa. É necessário validar o domínio do remetente no Resend antes de ativar os leads.

## Arquivos e onde editar

- `src/content/site.ts` — equipe, descrição dos agentes, funções, diferenciais, WhatsApp e FAQ.
- `src/components/StaffAutSite.tsx` — layout e interações da landing page.
- `src/components/LiquidField.tsx` — shader WebGL laranja autoral, renderizado só quando visível.
- `app/globals.css` — layout, design tokens, tipografia, responsividade, motion e acessibilidade.
- `app/api/lead/route.ts` — integração de contatos com Resend.
- `public/agents/` — cinco retratos enviados, convertidos em WebP com transparência preservada.
- `app/privacidade` e `app/termos` — textos-base que **precisam de revisão e dados oficiais** antes do lançamento.
- `preview.html` — prévia visual independente, gerada com `python make_preview.py`.

## Retratos

Disponíveis: **Artyx, Metryx, Krypton, Codanik e Cinex**. Ausentes: **Telos, Codask e Voxel**. Para substituir os placeholders, acrescente os retratos autorizados, por exemplo `public/agents/telos.webp`, e defina o campo `image` em `src/content/site.ts`. Preservar a aparência real das imagens fornecidas, sem criar ou trocar rostos.

## Critérios de UX e acessibilidade

A experiência usa três camadas de movimento:

1. Abertura editorial com retrato em destaque, círculos orbitais e elementos flutuantes.
2. Reação à rolagem com GSAP ScrollTrigger, Lenis e máscaras/títulos em revelação.
3. Interações com seleção de funcionário, troca de retrato, cenários de demonstração, menu mobile, accordion e feedback de formulário.

O WebGL pausa fora da tela, limita a resolução, respeita `prefers-reduced-motion` e tem fundo estático como fallback. O site funciona sem Canvas e sem animação. Nenhum painel diz que está enviando mensagens reais, e nenhum depoimento, métrica comercial ou preço foi inventado.

## Publicação

Hospede na Vercel como projeto Next.js. Configure as mesmas variáveis de `.env.local` no painel Environment Variables. Configure e valide remetente/recebedor do Resend. Teste a navegação, formulário, WhatsApp, erros de rede e responsividade, e revise a política e os termos com informações oficiais da empresa.

## Checklist

| Item | Estado |
|---|---|
| Layout e experiência editorial | Implementado |
| 8 agentes selecionáveis | Implementado |
| 5 retratos oficiais otimizados | Implementado |
| 3 placeholders sem retratos falsos | Implementado |
| Demo de 3 processos rotulada como simulação | Implementado |
| WebGL + GSAP + Lenis + Motion | Implementado no código Next |
| Modo reduced-motion | Implementado |
| Menu mobile, FAQ e navegação | Implementado |
| WhatsApp real | Pendente de número oficial |
| Envio de leads por e-mail | Pendente de Resend configurado |
| Dados jurídicos para privacidade e termos | Pendente de revisão |
| Build real da aplicação Next | Pendente de `npm install` em ambiente com rede |
