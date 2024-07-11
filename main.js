const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // TODO: Implement this function
  const { method, headers, url: reqUrl } = req;
  const parsedUrl = url.parse(reqUrl, true);
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const response = {
      method,
      headers,
      url: reqUrl,
      query: parsedUrl.query,
    };

    if (body) {
      try {
        response.body = JSON.parse(body);
      } catch (e) {
        response.body = body;
      }
    }

    res.end(JSON.stringify(response, null, 2));
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { server };
