# Configuratore Yocto – Frontend e Backend

Un’applicazione web per configurare e generare automaticamente template BitBake e file di configurazione per sistemi infotainment embedded basati su Yocto Project, con autenticazione JWT e deploy opzionale in cloud.

---

## Credenziali per accedere al Mockup
> - **username**: admin
> - **psw**: admin123

---

## Tecnologie utilizzate

- **Frontend**: React + Vite + TailwindCSS + React Hooks (`use state`) e prop-drilling + WebUSB/WebSerial API  
- **Backend**: Python 3.x + Flask + Jinja2 + flask-jwt-extended + Flask-CORS + jsonschema  
- **Autenticazione**: token JWT (flask-jwt-extended)  
- **Container**: Docker (backend)  
- **CI/CD**: GitHub Pages (frontend) + Render.com (backend)  

---

## Prerequisiti

- Node.js ≥ 14  
- Python ≥ 3.8  
- Docker (opzionale, per il backend)  
- Git  

---

## Installazione e avvio in locale

### 1. Clona il repository  
```bash
git clone https://github.com/tuo-utente/configuratore-lite.git
cd configuratore-lite
```

---

### 2. Backend (locale)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: .\venv\Scripts\activate
pip install -r requirements.txt

# Imposta la porta (in accordo con il proxy Vite)
export PORT=5001              # Windows PowerShell: $env:PORT=5001

# Avvia il server Flask
python main.py                # oppure: flask run
```
Il backend sarà disponibile su `http://localhost:5001`.

---

### 3. Backend via Docker (opzionale)

```bash
cd backend
docker build -t configuratore-backend .
docker run -p 5001:5000 configuratore-backend
```

---

### 4. Frontend (sviluppo)

Torna nella root del progetto e avvia il client:

```bash
cd ..
npm install
npm run dev
```
Il frontend gira su `http://localhost:5173` (proxy `/api` → `http://localhost:5001`).

---

## Configurazione dell’URL del backend

Il frontend legge la variabile `VITE_API_URL` per decidere dove indirizzare le chiamate API:

- **Default** (non definita): `http://localhost:5001`  
- **Override**: imposta `VITE_API_URL` per puntare al backend su Render  
  ```bash
  export VITE_API_URL=https://tuo-backend.onrender.com
  npm run dev
  ```

Nel codice (`src/config.ts`):
```ts
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:5001';
```
> **Suggerimento:** puoi definire `VITE_API_URL` anche in un `.env` alla radice:
> ```env
> VITE_API_URL=https://tuo-backend.onrender.com
> ```

---

## Deployment

### Frontend su GitHub Pages

```bash
npm run build
npm install --save-dev gh-pages
npx gh-pages -d dist
```

### Backend su Render.com

1. Crea un nuovo servizio “Web Service” collegando il repo.  
2. Imposta il comando di avvio:
   ```bash
   gunicorn main:app --bind 0.0.0.0:$PORT
   ```
3. Definisci la variabile d’ambiente `PORT=5001`.

---

## Estensioni possibili

- Integrazione BitBake per build Yocto reali  
- Gestione utenti/admin (backend)  
- Persistenza delle configurazioni (database)  
- Pipeline CI/CD avanzata (GitHub Actions, GitLab CI, Jenkins)  
- Supporto multitenant e versioning dei file di configurazione  

---

## Autore

Andrea La Commara — Tirocinio Curricolare presso **Teoresi S.p.A.**  
Tutor aziendale: Daniele Napolitano  
