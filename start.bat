@echo off
rem Code&Paint Studio - double-click to start (Windows).
rem Launches a local micro-server for THIS folder and opens Code&Paint in your browser.
rem Keep this window open while using the studio; close it to stop.
cd /d "%~dp0"
title Code&Paint Studio
where node >nul 2>&1 && (node serve.mjs & goto end)
where py >nul 2>&1 && (py -3 serve.py & goto end)
where python >nul 2>&1 && (python serve.py & goto end)
echo [Error] Code&Paint requires Node.js or Python 3 to run locally.
echo Install Node.js from https://nodejs.org or Python from https://www.python.org/
echo then double-click start.bat again.
:end
pause
