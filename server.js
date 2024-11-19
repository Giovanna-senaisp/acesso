const express = require('express');
const app = express();
const port = 3000;

// Configura o Express para servir arquivos estáticos
app.use(express.static('public'));

// Variável para armazenar os acessos (não persiste após reiniciar o servidor)
const pageAccessCount = {};

// Mapeamento de nomes das páginas (corrigido)
const pageNames = {
  '/demonia': 'Demonia',
  '/maria-fumaca': 'Maria fumaça',
  '/herezia': 'Herezia',
  '/nervosa': 'Nervosa',
  '/thunderpussy': 'Thunderpussy',
  '/carmen-maki-e-oz': 'Carmen Maki e Oz',
  '/matthew-hall': 'Matthew Hall',
  'sofia-froza': 'Sofia Froza',
  'linguagem': 'Linguagem',
  'lya-mendes': 'Lya Mendes',idc
  'wiona-oak': 'Wiona Oak',
  'bem': 'Bem',
  'sessa': 'Sessa',
  'ana-frango-eletrico': 'Ana Frango Elétrico',
  'luiza-lian': 'Luiza Lian',
  'tim-bernardes': 'Tim Bernardes',
  'maria-beraldo': 'Maria Beraldo',
  'josyara': 'Josyara',
  'nivy': 'Nivy',
  'little-simz': 'Little Simz',
  'nill': 'Nill',
  'mick-jenkins': 'Mick Jenkins',
  'ebony': 'Ebony',
  'sampa-the-great': 'Sampa the Great',
  '/skee-mask': 'Skee Mask',
  'bicep': 'Bicep',
  'nidia': 'Nidia',
  '/avalon-emerson': 'Avalon Emerson',
  'dj-seinfeld': 'DJ Seinfeld',
  'yaeji': 'Yaeji',
  'dreamcatcher': 'Dreamcatcher',
  'oneus': 'Oneus',
  'alexa': 'AleXa',
  '3ye': '3YE',
  'bdc': 'BDC',
  'onlyoneof': 'OnlyOneOf',
  'tanya-x': 'Tanya X',
  'amora-bettany': 'Amora Bettany',
  '/ojira-fumoto': 'Ojira Fumoto',
  '/long-hat-house': 'Long Hat House',
  '/adam-robson-yu': 'Adam Robson-Yu',
  '/alex-preston': 'Alex Preston',
  '/reuben-wu': 'Reuben Wu',
  '/bruno-massa': 'Bruno Massa'
};

// Middleware para registrar os acessos
app.use((req, res, next) => {
  const page = req.path;
  if (!pageAccessCount[page]) {
    pageAccessCount[page] = 0;
  }
  pageAccessCount[page]++;
  next();
});

// Rota para exibir as estatísticas
app.get('/stats', (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Estatísticas de Acessos</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <h1>Estatísticas de Acessos</h1>
      <table>
        <thead>
          <tr>
            <th>Página</th>
            <th>Acessos</th>
          </tr>
        </thead>
        <tbody>
  `;

  // Cria uma lista de páginas e acessos
  const pageAccessArray = Object.entries(pageAccessCount)
    .map(([page, count]) => ({ page, count }));

  // Ordena a lista de páginas pelos acessos de forma decrescente (do maior para o menor)
  const sortedPages = pageAccessArray.sort((a, b) => b.count - a.count);

  // Exibe as páginas com seus respectivos acessos ordenados
  sortedPages.forEach(({ page, count }, index) => {
    const displayPage = pageNames[page] || page; // Renomeia a página, se houver um nome mapeado
    let className = '';
    if (index === 0) {
      className = 'highlight1'; // Destaque para a página mais acessada
    } else if (index === 1) {
      className = 'highlight2'; // Destaque para a segunda página mais acessada
    } else if (index === 2) {
      className = 'highlight3'; // Destaque para a terceira página mais acessada
    }

    html += `
      <tr>
        <td class="${className}">${displayPage}</td>
        <td class="${className}">${count}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  res.send(html); // Envia o HTML para o navegador
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
