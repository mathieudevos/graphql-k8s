FROM node:10.3

WORKDIR /backend
COPY . /backend/

RUN cd /backend && yarn install

ENTRYPOINT ["yarn", "start"]