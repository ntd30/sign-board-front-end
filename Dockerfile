# Giai đoạn build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_BACKEND_URL=https://api.v1.ai2.vn
RUN npm run build

