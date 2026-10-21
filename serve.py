#!/usr/bin/env python3
"""Code&Paint Studio: local high-performance server.
Opens the algorithmic painting studio locally in your browser.
Close the window or press Ctrl+C to stop."""
import http.server
import os
import socket
import sys
import threading
import webbrowser

# Ensure UTF-8 stdout encoding on Windows consoles
if sys.platform == 'win32' and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

os.chdir(os.path.dirname(os.path.abspath(__file__)))


def free_port(p=8765):
    for port in range(p, p + 100):
        with socket.socket() as s:
            try:
                s.bind(('127.0.0.1', port))
                return port
            except OSError:
                continue
    raise SystemExit('No free port found between 8765 and 8864.')


class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        '.js': 'text/javascript',
        '.mjs': 'text/javascript',
        '.webp': 'image/webp',
        '.wasm': 'application/wasm',
        '.woff2': 'font/woff2',
        '.tflite': 'application/octet-stream',
    }

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, *args):
        pass


port = free_port()
server = http.server.ThreadingHTTPServer(('127.0.0.1', port), Handler)
url = f'http://localhost:{port}/'
version = open('VERSION').read().strip() if os.path.exists('VERSION') else '5.0.0'
print(f'\n[Code&Paint Studio v{version}] running at {url}')
print('Keep this window open while using the studio. Press Ctrl+C to stop.\n', flush=True)

if not os.environ.get('CP_NO_BROWSER'):
    threading.Timer(0.8, lambda: webbrowser.open(url)).start()

try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
