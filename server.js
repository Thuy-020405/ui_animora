import express from 'express';
import next from 'next';
import { parse } from 'node:url';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();

  // Next.js request handler
  expressApp.all(/.*/, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  expressApp.listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Animora production server ready on http://${hostname}:${port}`);
  });
});
