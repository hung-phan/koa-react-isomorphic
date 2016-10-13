FROM node:6.7.0

MAINTAINER Hung Phan

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64

RUN chmod +x /usr/local/bin/dumb-init

ENV NODE_ENV=production \
    SECRET_KEY=secret

WORKDIR /opt/app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

CMD ["dumb-init", "npm", "start"]
