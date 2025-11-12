# Yocto Configurator – Frontend & Backend

A web application that configures and automatically generates BitBake templates plus configuration files for embedded infotainment systems built with the Yocto Project, featuring JWT authentication and optional cloud deployment.

---

## Mockup Credentials
> - **username**: admin
> - **password**: admin123

---

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS + React Hooks (`useState`) with prop drilling + WebUSB/WebSerial API  
- **Backend**: Python 3.x + Flask + Jinja2 + flask-jwt-extended + Flask-CORS + jsonschema  
- **Authentication**: JWT tokens (flask-jwt-extended)  
- **Containerization**: Docker (backend)  
- **CI/CD**: GitHub Pages (frontend) + Render.com (backend)  

---

## Prerequisites

- Node.js ≥ 14  
- Python ≥ 3.8  
- Docker (optional, backend only)  
- Git  

---

## Local Setup

### 1. Clone the repository  
```bash
git clone https://github.com/tuo-utente/configuratore-lite.git
cd configuratore-lite
```

---

### 2. Backend (local)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: .\venv\Scripts\activate
pip install -r requirements.txt

# Keep the port aligned with the Vite proxy
export PORT=5001              # Windows PowerShell: $env:PORT=5001

# Start the Flask server
python main.py                # or: flask run
```
The backend will be available at `http://localhost:5001`.

---

### 3. Backend via Docker (optional)

```bash
cd backend
docker build -t configuratore-backend .
docker run -p 5001:5000 configuratore-backend
```

---

### 4. Frontend (development)

Go back to the project root and start the client:

```bash
cd ..
npm install
npm run dev
```
The frontend runs on `http://localhost:5173` (proxy `/api` → `http://localhost:5001`).

---

## Backend URL configuration

The frontend reads the `VITE_API_URL` variable to decide where to send API calls:

- **Default** (undefined): `http://localhost:5001`  
- **Override**: set `VITE_API_URL` to point to the backend running on Render  
  ```bash
  export VITE_API_URL=https://tuo-backend.onrender.com
  npm run dev
  ```

In code (`src/api.js`):
```ts
const BASE_API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:5001';
```
> **Tip:** you can also define `VITE_API_URL` in a root-level `.env` file:
> ```env
> VITE_API_URL=https://tuo-backend.onrender.com
> ```

---

## Deployment

### Frontend on GitHub Pages

```bash
npm run build
npm install --save-dev gh-pages
npx gh-pages -d dist
```

### Backend on Render.com

1. Create a new “Web Service” and connect the repository.  
2. Set the start command:
   ```bash
   gunicorn main:app --bind 0.0.0.0:$PORT
   ```
3. Define the environment variable `PORT=5001`.

---

## Future extensions

- BitBake integration for real Yocto builds  
- User/admin management (backend)  
- Configuration persistence (database)  
- Advanced CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins)  
- Multitenant support and configuration versioning  

---

## Author

Andrea La Commara — Curricular Internship at **Teoresi S.p.A.**  
Company tutor: Daniele Napolitano  
