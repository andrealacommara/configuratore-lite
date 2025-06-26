# Configuratore Yocto - Frontend + Backend

Un'applicazione web che consente di configurare e generare automaticamente frammenti di configurazione per Yocto (config.bbappend, local.conf, ecc.), con supporto all'autenticazione e al download dei file in formato ZIP.

## 🧱 Tecnologie utilizzate

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Flask + Jinja2 + JWT
- **Autenticazione**: Login con token JWT
- **CI/CD**: GitHub Pages (frontend) + Render (backend)
- **Docker**: per l'esecuzione e la distribuzione del backend
- **Altre**: CORS, gh-pages, jsonschema

---

## 🖥️ Come eseguire in locale

### Frontend

```bash
cd configuratore-lite
npm install
npm run dev
```

Durante lo sviluppo, le chiamate a `/api/...` vengono proxyate verso `localhost:5001`.

### Backend

```bash
cd backend
./start.sh
```

Questo comando builda e avvia il backend Flask in un container Docker su porta `5001`.

---

## 🔐 Login

Accedi con:

```
Username: admin
Password: admin123
```

Viene restituito un **token JWT** che abilita la generazione dei file.

---

## 🚀 Deploy

### Frontend

Deploy automatico su **GitHub Pages** tramite script:

```bash
npm run deploy
```

Disponibile su:  
📎 [https://andrealacommara.github.io/configuratore-lite/](https://andrealacommara.github.io/configuratore-lite/)

### Backend

Deploy su **Render** come servizio Docker-based:

📎 [https://configuratore-lite.onrender.com](https://configuratore-lite.onrender.com)

---

## 📁 Struttura del progetto

```
configuratore-lite/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── api.js
│   └── App.jsx
├── backend/
│   ├── main.py
│   ├── template/
│   └── requirements.txt
├── Dockerfile
└── vite.config.js
```

---

## 🔄 Estensioni possibili

- Generazione e build BitBake reali
- Interfaccia di gestione utenti/admin
- Esportazione su GitHub repo/branch
- Logica multitenant

---

## 👤 Autore

Andrea La Commara — Progetto di tirocinio presso **Teoresi S.p.A.**  
Tutor aziendale: Daniele Napolitano
