#!/bin/bash

# Path assoluto alla cartella del tuo progetto (modifica se necessario)
PROJECT_DIR="$HOME/Documenti/configuratore-lite"

# Terminale 1: frontend (vite)
osascript <<END
tell application "Terminal"
  do script "cd '$PROJECT_DIR' && npm run dev"
end tell
END

# Terminale 2: backend (node server)
osascript <<END
tell application "Terminal"
  do script "cd '$PROJECT_DIR' && npm run start:server"
end tell
END
