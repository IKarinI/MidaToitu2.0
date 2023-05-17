const header = (heading) => `
<!DOCTYPE html>
<html lang="et">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="/style.css" />
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="/js/front.js"></script>
    <title>${heading}</title>
  </head>

  <body>
    <div class="vjoon" id="vj1"></div>
    <div class="vjoon" id="vj2"></div>
    <div class="vjoon" id="vj3"></div>
    <div class="v2line">`;

const footer = `
  </div>
  </body>
  </html>`;

module.exports = { header, footer };
