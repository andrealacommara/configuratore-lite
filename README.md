# Configuratore Yocto

Un'applicazione full-stack per la generazione automatica di frammenti di configurazione Yocto, basata su interfaccia React e backend Python con Flask.

## 🚀 Funzionalità principali

- Autenticazione con token JWT
- Rilevamento automatico della board via WebUSB
- Selezione moduli e opzioni (Debug, OTA)
- Anteprima JSON in tempo reale
- Generazione automatica di:
  - `config.bbappend`
  - `local.conf`
  - `fragment.conf`
- Download automatico in formato `.zip`
- Interfaccia responsive e moderna
- Dockerizzazione completa del backend
- CI con GitHub Actions

## 🧱 Struttura del progetto

```
├── backend/               # Backend Flask + Jinja2
│   ├── main.py
│   ├── schema.json
│   └── template/          # Template Jinja
├── configuratore-lite/    # Frontend React + Vite + Tailwind
│   ├── components/
│   ├── data/
│   └── index.css
├── .github/workflows/     # CI GitHub Actions
├── Dockerfile
└── docker-compose.yml
```

## ▶️ Avvio locale

### Prerequisiti

- Node.js ≥ 18
- Python ≥ 3.11
- Docker
- Docker Compose

### 1. Avvio del backend

```bash
cd backend
./start.sh
```

Il backend sarà disponibile su [http://localhost:5001](http://localhost:5001)

### 2. Avvio del frontend

```bash
cd configuratore-lite
npm install
npm run dev
```

Il frontend sarà disponibile su [http://localhost:5173](http://localhost:5173)

⚠️ Assicurati che il proxy Vite sia configurato su `/api` → `http://localhost:5001`

## 🔐 Credenziali di accesso (dev)

```txt
Username: admin
Password: admin123
```

## 🧪 CI GitHub Actions

Ogni `push` o `pull request` su `main` attiva un workflow che:

- Compila il backend via Docker
- Compila il frontend React

👉 Puoi seguire gli esiti nella tab **Actions** del repository.

## 📦 Build produzione (solo backend)

```bash
cd backend
docker build -t configuratore-backend .
docker run -p 5001:5000 configuratore-backend
```

## 📝 Autore

**Andrea La Commara**  
Progetto sviluppato durante il tirocinio presso **Teoresi S.p.A.**

## 📜 Licenza

MIT
