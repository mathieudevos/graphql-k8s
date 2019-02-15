FROM node:10.3-alpine

WORKDIR /backend
COPY ./package.json   /backend/
COPY ./src            /backend/src
COPY ./seeds          /backend/seeds
COPY ./schemas        /backend/schemas

RUN cd /backend && yarn install

ENTRYPOINT ["npm", "start"]