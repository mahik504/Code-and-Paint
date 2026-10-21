#!/bin/bash
# Code&Paint Studio - double-click to start (macOS / Linux)
cd "$(dirname "$0")"
if command -v node >/dev/null 2>&1; then
  node serve.mjs
elif command -v python3 >/dev/null 2>&1; then
  python3 serve.py
elif command -v py >/dev/null 2>&1; then
  py -3 serve.py
else
  echo "[Error] Code&Paint requires Node.js or Python 3 to run locally."
  echo "Please install Node.js (https://nodejs.org) or Python 3 (https://www.python.org)."
fi
