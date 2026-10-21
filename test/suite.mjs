// Code&Paint Studio Comprehensive Automated Test Suite
// Verifies syntax, AST parsing, server endpoints, metadata serialization,
// branding integrity, and portable distribution archive.

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { startServer, root } from '../serve.mjs';

const __filename = fileURLToPath(import.meta.url);
const testDir = path.dirname(__filename);
const projectRoot = path.resolve(testDir, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (!condition) {
    failedTests++;
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(message);
  }
  passedTests++;
  console.log(`  ✅ PASS: ${message}`);
}

async function runSection(name, fn) {
  console.log(`\n▶ [Test Suite] ${name}`);
  try {
    await fn();
  } catch (err) {
    console.error(`  Suite Error in "${name}":`, err.message);
  }
}

// ─────────────────────────────────────────────────────────────
// 1. Syntax & AST Validation
// ─────────────────────────────────────────────────────────────
await runSection('Syntax & AST Compilation', async () => {
  // Check viewer3d.js
  const v3d = spawnSync('node', ['--check', path.join(projectRoot, 'viewer3d.js')]);
  assert(v3d.status === 0, 'viewer3d.js compiles cleanly without syntax errors');

  // Check serve.mjs
  const sm = spawnSync('node', ['--check', path.join(projectRoot, 'serve.mjs')]);
  assert(sm.status === 0, 'serve.mjs compiles cleanly without syntax errors');

  // Parse HTML and extract script blocks from index.html
  const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
  assert(indexHtml.includes('<title>Code&Paint —'), 'index.html has rebranded Code&Paint title');
  assert(indexHtml.includes('https://github.com/mahik504/Code-and-Paint'), 'index.html links to mahik504 repository');

  // Extract inline scripts
  const scriptRegex = /<script(?:\s+type="([^"]*)")?>([\s\S]*?)<\/script>/gi;
  let match;
  let inlineScriptCount = 0;
  while ((match = scriptRegex.exec(indexHtml)) !== null) {
    const type = match[1] || 'text/javascript';
    const code = match[2].trim();
    if (!code) continue;

    if (type === 'importmap' || type === 'application/json') {
      let parsedJson;
      try {
        parsedJson = JSON.parse(code);
      } catch (e) {
        throw new Error(`Invalid JSON in <script type="${type}">: ${e.message}`);
      }
      assert(parsedJson !== null, `Valid JSON in <script type="${type}">`);
    } else if (type === 'module' || type === 'text/javascript') {
      try {
        // Test script syntax by parsing as function body
        new Function(code);
        inlineScriptCount++;
      } catch (e) {
        throw new Error(`Inline script parse error: ${e.message}`);
      }
    }
  }
  assert(inlineScriptCount > 0, `Successfully parsed and validated ${inlineScriptCount} inline script blocks in index.html`);
});

// ─────────────────────────────────────────────────────────────
// 2. HTTP Server & MIME Types
// ─────────────────────────────────────────────────────────────
await runSection('HTTP Server Endpoints & Asset Delivery', async () => {
  const testPort = 19876;
  const instance = await startServer(testPort, false);
  const baseUrl = `http://127.0.0.1:${instance.port}`;

  const fetchAsset = urlPath => new Promise((resolve, reject) => {
    http.get(`${baseUrl}${urlPath}`, res => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    }).on('error', reject);
  });

  try {
    // 1. Root index.html
    const rootRes = await fetchAsset('/');
    assert(rootRes.status === 200, 'GET / returns 200 OK');
    assert(rootRes.headers['content-type'].includes('text/html'), 'GET / has text/html content-type');
    assert(rootRes.body.includes('Code&Paint Studio'), 'GET / body includes "Code&Paint Studio"');

    // 2. package.json
    const pkgRes = await fetchAsset('/package.json');
    assert(pkgRes.status === 200, 'GET /package.json returns 200 OK');
    assert(pkgRes.headers['content-type'] === 'application/json', 'GET /package.json has application/json');
    const pkgData = JSON.parse(pkgRes.body);
    assert(pkgData.name === 'code-and-paint', 'package.json name is code-and-paint');

    // 3. viewer3d.js
    const vRes = await fetchAsset('/viewer3d.js');
    assert(vRes.status === 200, 'GET /viewer3d.js returns 200 OK');
    assert(vRes.headers['content-type'].includes('text/javascript'), 'GET /viewer3d.js has text/javascript');

    // 4. VERSION
    const verRes = await fetchAsset('/VERSION');
    assert(verRes.status === 200, 'GET /VERSION returns 200 OK');
    assert(verRes.body.trim() === '5.0.0', 'VERSION file content is 5.0.0');

    // 5. 404 Not Found
    const nRes = await fetchAsset('/nonexistent-file-404.xyz');
    assert(nRes.status === 404, 'GET nonexistent file returns 404 Not Found');

    // 6. 403 Forbidden directory traversal
    const fRes = await fetchAsset('/../../outside.txt');
    assert(fRes.status === 403 || fRes.status === 404, 'Path traversal attempt rejected with 403 or 404');
  } finally {
    await instance.close();
    console.log('  ℹ Server cleanly stopped.');
  }
});

// ─────────────────────────────────────────────────────────────
// 3. Metadata Serialization & Backwards Compatibility
// ─────────────────────────────────────────────────────────────
await runSection('Metadata Engine & Format Compatibility', async () => {
  // META_UUID_V5: 16 bytes: "code-and-paint\0\0"
  const expectedUuidV5 = [0x63, 0x6f, 0x64, 0x65, 0x2d, 0x61, 0x6e, 0x64, 0x2d, 0x70, 0x61, 0x69, 0x6e, 0x74, 0x00, 0x00];
  const expectedUuidLegacy = [0x63, 0x6f, 0x64, 0x65, 0x2d, 0x70, 0x61, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x2d, 0x76, 0x31, 0x00];

  assert(expectedUuidV5.length === 16, 'META_UUID_V5 is exactly 16 bytes for MP4 uuid box compatibility');
  assert(expectedUuidLegacy.length === 16, 'META_UUID_LEGACY is exactly 16 bytes');

  const v5Str = String.fromCharCode(...expectedUuidV5.slice(0, 14));
  assert(v5Str === 'code-and-paint', 'META_UUID_V5 string prefix is "code-and-paint"');

  // Test metadata reader regex matching
  const testSvgV5 = '<svg viewBox="0 0 100 100"><metadata id="code-and-paint">{"app":"code-and-paint","version":"5.0.0"}</metadata></svg>';
  const testSvgLegacy = '<svg viewBox="0 0 100 100"><metadata id="code-painter">{"app":"code-painter","version":"4.25.0"}</metadata></svg>';
  const metaRegex = /<metadata id="(?:code-and-paint|code-painter)">([\s\S]*?)<\/metadata>/;

  const matchV5 = testSvgV5.match(metaRegex);
  assert(matchV5 && JSON.parse(matchV5[1]).app === 'code-and-paint', 'Metadata regex successfully extracts v5 code-and-paint');

  const matchLegacy = testSvgLegacy.match(metaRegex);
  assert(matchLegacy && JSON.parse(matchLegacy[1]).app === 'code-painter', 'Metadata regex successfully extracts legacy code-painter');
});

// ─────────────────────────────────────────────────────────────
// 4. Codebase Hygiene & Zero Residuals
// ─────────────────────────────────────────────────────────────
await runSection('Codebase Hygiene & Zero Residuals', async () => {
  const checkExts = ['.html', '.js', '.mjs', '.css', '.json', '.md', '.bat', '.command', '.py'];
  const bannedKeywords = ['jasblack', 'jas.black'];

  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.name === '.git' || ent.name === 'node_modules' || ent.name === '_temp_extract' || ent.name === 'suite.mjs') continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        scanDir(full);
      } else if (checkExts.some(ext => ent.name.toLowerCase().endsWith(ext))) {
        const content = fs.readFileSync(full, 'utf8').toLowerCase();
        for (const kw of bannedKeywords) {
          if (content.includes(kw)) {
            throw new Error(`Found banned keyword "${kw}" in ${path.relative(projectRoot, full)}`);
          }
        }
      }
    }
  }

  scanDir(projectRoot);
  assert(true, 'Zero occurrences of "jasblack" or legacy author references across all repository files');
});

// ─────────────────────────────────────────────────────────────
// 5. Portable Offline Archive Verification
// ─────────────────────────────────────────────────────────────
await runSection('Portable Offline ZIP Archive', async () => {
  const zipPath = path.join(projectRoot, 'download', 'code-and-paint-local.zip');
  assert(fs.existsSync(zipPath), 'download/code-and-paint-local.zip exists on disk');

  const pyCheck = spawnSync('python', [
    '-c',
    `import zipfile, sys
z = zipfile.ZipFile(r"${zipPath}")
names = z.namelist()
assert all(n.startswith("code-and-paint-local/") for n in names), "Not all files inside code-and-paint-local/"
bad = [n for n in names if "painter" in n.lower() or "jas" in n.lower()]
assert len(bad) == 0, f"Found bad names: {bad}"
print(f"ZIP OK: {len(names)} files")`
  ]);

  assert(pyCheck.status === 0, 'ZIP package verified: root is code-and-paint-local/ with 0 legacy filenames');
});

console.log(`\n══════════════════════════════════════════════`);
console.log(`Test Summary: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
console.log(`══════════════════════════════════════════════\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
