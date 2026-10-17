import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const port = Number(process.env.PORT || 4173);
const host = '127.0.0.1';

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

async function resolveRequest(pathname) {
  const decoded = decodeURIComponent(pathname);
  const normalized = normalize(decoded).replace(/^([/\\])+/, '');
  const candidate = resolve(root, normalized);

  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) return null;

  try {
    const info = await stat(candidate);
    if (info.isDirectory()) return join(candidate, 'index.html');
    if (info.isFile()) return candidate;
  } catch {
    if (!extname(candidate)) {
      const directoryIndex = join(candidate, 'index.html');
      try {
        if ((await stat(directoryIndex)).isFile()) return directoryIndex;
      } catch {
        return null;
      }
    }
  }

  return null;
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', `http://${host}:${port}`);
    const filePath = await resolveRequest(url.pathname);

    if (!filePath) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    const body = await readFile(filePath);
    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentTypes[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(body);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Local preview error');
  }
});

server.listen(port, host, () => {
  console.log(`WorkLog site preview: http://${host}:${port}/`);
});
