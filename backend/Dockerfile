# Dockerfile per l'interprete Python
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copia i file del backend
COPY . .

# Installa le dipendenze
RUN pip install --no-cache-dir -r requirements.txt

# Espone la porta del server Flask
EXPOSE 5000

# Comando di avvio
CMD ["python", "main.py"]
