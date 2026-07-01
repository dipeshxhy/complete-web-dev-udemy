const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHeader(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the homepage!, order your drink at /coffee or /ice-tea');
  } else if (req.url === '/ice-tea') {
    res.writeHeader(200, { 'Content-Type': 'text/plain' });
    res.end('Here is your ice tea!');
  } else if (req.url === '/coffee') {
    res.writeHeader(200, { 'Content-Type': 'text/plain' });
    res.end('Here is your coffee!');
  } else {
    res.writeHeader(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
