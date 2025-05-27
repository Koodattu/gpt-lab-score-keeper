# Dockerfile for json-server backend
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 5000
CMD ["npx", "json-server", "--host", "0.0.0.0", "--watch", "db.json", "--port", "5000"]
