FROM node:current-slim

WORKDIR /usr/src/server

COPY . ./

RUN npm install

RUN npm install pm2 -g

RUN npm run build

COPY ./dist .

EXPOSE 3001

CMD ["pm2-runtime","server.js"]