@echo off
start cmd /k "cd /d %~dp0root-config && npm start"
start cmd /k "cd /d %~dp0angular && npm start"
start cmd /k "cd /d %~dp0react && npm start"
