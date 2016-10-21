FROM node:6.7.0

MAINTAINER Hung Phan

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64

RUN chmod +x /usr/local/bin/dumb-init

RUN npm install -g yarn

WORKDIR /opt/app

COPY package.json yarn.lock ./

COPY scripts/postinstall ./scripts/postinstall

RUN yarn install

ENV NODE_ENV=production \
    SECRET_KEY=secret

COPY . .

RUN yarn run build

CMD ["dumb-init", "yarn", "start"]
