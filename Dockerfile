FROM node:current-slim

ARG TEST_ARG
ARG PORT_ARG
ARG DATABASE_URL_ARG
ARG GRAPHQL_URL_ARG

WORKDIR /usr/src/server

ENV PORT=PORT_ARG
ENV DATABASE_URL=DATABASE_URL_ARG
ENV GRAPHQL_URL=GRAPHQL_URL_ARG
ENV TEST=TEST_ARG

COPY . ./

RUN npm install

RUN npm install ts-node -g

EXPOSE 8080

CMD ["npm", "run", "server"]