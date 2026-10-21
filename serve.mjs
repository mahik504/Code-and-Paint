// Code&Paint Studio: lightweight local development & streaming server.
// Runs the studio locally in your browser. Close this terminal to stop.
//   node serve.mjs
import http from 'node:http';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const root = path.dirname(fileURLToPath(import.meta.url));
export const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2',
  '.tflite': 'application/octet-stream',
  '.wasm': 'application/wasm',
  '.md': 'text/plain; charset=utf-8',
  '.zip': 'application/zip'
};

export const free = p => new Promise(ok => {
  const s = net.createServer().once('error', () => ok(false)).once('listening', () => s.close(() => ok(true))).listen(p, '127.0.0.1');
});

export function createRequestHandler() {
  return (req, res) => {
    let url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (url.endsWith('/')) url += 'index.html';
    const file = path.normalize(path.join(root, url));
    if (!file.startsWith(root)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    fs.stat(file, (err, st) => {
      if (err || !st.isFile()) {
        res.writeHead(404).end('Not Found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(file).pipe(res);
    });
  };
}

export async function startServer(preferredPort = 8765, openBrowser = !process.env.CP_NO_BROWSER) {
  let port = preferredPort;
  while (!(await free(port))) port++;

  const server = http.createServer(createRequestHandler());
  await new Promise(resolve => server.listen(port, '127.0.0.1', resolve));

  const url = `http://localhost:${port}/`;
  const version = fs.existsSync(path.join(root, 'VERSION')) ? fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim() : '5.0.0';
  console.log(`\n🎨 Code&Paint Studio v${version} running at ${url}`);
  console.log('Keep this window open while using the studio. Press Ctrl+C to stop.\n');

  if (openBrowser) {
    const [cmd, args] = process.platform === 'darwin'
      ? ['open', [url]]
      : process.platform === 'win32'
        ? ['cmd', ['/c', 'start', '', url]]
        : ['xdg-open', [url]];
    setTimeout(() => spawn(cmd, args, { stdio: 'ignore', detached: true }).unref(), 600);
  }

  return {
    server,
    port,
    url,
    close: () => new Promise(resolve => server.close(resolve))
  };
}

// Auto-run when invoked directly from CLI
const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  await startServer();
}
