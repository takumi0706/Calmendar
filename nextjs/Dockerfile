FROM node:20-alpine

WORKDIR /nextjs

COPY package*.json ./
COPY . .

RUN npm install

RUN npm run build
