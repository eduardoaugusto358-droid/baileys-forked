const http = require('http');
const args = process.argv.slice(2);
const portIdx = args.indexOf('--port');
const port = portIdx > -1 ? +args[portIdx + 1] : 8080;
http.createServer((req, res) => {
  res.end('Baileys library project');
}).listen(port, () => console.log(`Listening on port ${port}`));
