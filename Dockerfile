FROM node:current-slim

WORKDIR /usr/src/server

COPY . ./

RUN npm install

RUN npm install ts-node -g

EXPOSE 8080

CMD ["npm", "run", "server"]