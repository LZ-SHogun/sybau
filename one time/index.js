import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewedIPs = new Set();

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (viewedIPs.has(ip)) {
    res.sendFile(path.join(__dirname, 'already-viewed.html'));
  } else {
    viewedIPs.add(ip);
    res.sendFile(path.join(__dirname, 'secret.html'));
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
