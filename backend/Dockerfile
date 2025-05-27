# Dockerfile for json-server backend
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN mkdir -p /app/data
COPY db.json /app/data/db.json
EXPOSE 5000
CMD ["npx", "json-server", "--host", "0.0.0.0", "--watch", "data/db.json", "--port", "5000"]
