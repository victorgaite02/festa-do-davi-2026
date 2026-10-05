# Festa do Davi — GitHub Pages

Esta pasta é a versão estática do convite, publicada em [GitHub Pages](https://victorgaite02.github.io/festa-do-davi-2026/). O arquivo de entrada é `index.html`; os arquivos de `images/` e `fonts/` devem permanecer juntos.

O formulário envia as confirmações para `https://festa-do-davi-2026.gaite.chatgpt.site/api/rsvp`. A API grava as respostas na tabela privada `public.rsvps` do projeto Supabase `irmgzsiaqdygkbfyztzd` e envia um aviso por email. O GitHub Pages hospeda apenas a página; a API e a chave de gravação ficam no Site atual. Para ver a lista: Supabase → projeto → Table Editor → `rsvps`.

O Site atual está público e sua API responde a visitantes do GitHub Pages. A página não pede WhatsApp. Cada adulto confirmado informa nome e CPF; ao aumentar a quantidade de adultos ou crianças, surgem os campos correspondentes. Depois de um envio bem-sucedido, abre a tela de tamanhos (roupas: 2 anos; calçados: 19), com a tabela expansível. A localização abre pelo bloco no topo. O botão discreto ao fim da página permite consultar novamente a tabela de tamanhos.

Para atualizar: edite os arquivos desta pasta, confira a página localmente, depois rode `git add .`, `git commit -m "Atualiza convite"` e `git push`. O GitHub Pages publica a branch `main` automaticamente. Não publique o código do projeto `davi-site` como se fosse uma página estática.
