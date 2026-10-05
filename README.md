# Festa do Davi — GitHub Pages

Esta pasta é a versão estática do convite, publicada em [GitHub Pages](https://victorgaite02.github.io/festa-do-davi-2026/). O arquivo de entrada é `index.html`; os arquivos de `images/` e `fonts/` devem permanecer juntos.

O formulário envia as confirmações para `https://festa-do-davi-2026.gaite.chatgpt.site/api/rsvp`. As respostas ficam salvas no banco D1 do Site atual, na tabela `rsvps`. O GitHub Pages hospeda apenas a página; a API e o banco continuam no Site atual. Para ver a lista: Sites → Configurações → Banco de dados → DB → rsvps.

O Site atual está público e sua API responde a visitantes do GitHub Pages. A página não pede WhatsApp. O primeiro adulto usa o campo “Seu nome”; ao aumentar a quantidade de adultos ou crianças, surgem campos para os demais nomes. Depois de um envio bem-sucedido, abre a tela de tamanhos (roupas: 2 anos; calçados: 19), com a tabela expansível. A localização abre pelo bloco no topo. A tabela de tamanhos também pode ser aberta pelo botão na parte inferior.

Para atualizar: edite os arquivos desta pasta, confira a página localmente, depois rode `git add .`, `git commit -m "Atualiza convite"` e `git push`. O GitHub Pages publica a branch `main` automaticamente. Não publique o código do projeto `davi-site` como se fosse uma página estática.
