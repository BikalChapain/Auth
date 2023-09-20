FROM node:16-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build


CMD [ "node", "dist/main.js" ]