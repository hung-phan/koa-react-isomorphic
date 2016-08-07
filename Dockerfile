FROM node:4.4.7

MAINTAINER Hung Phan

ENV NODE_ENV=production \
    SECRET_KEY=secret

WORKDIR /opt/app

COPY . .

RUN npm install -g npm

RUN npm i

RUN npm run build

CMD ["npm", "start"]
