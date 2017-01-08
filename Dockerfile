FROM node:6.9.4

MAINTAINER Hung Phan

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64

RUN chmod +x /usr/local/bin/dumb-init

RUN apt-key adv --keyserver pgp.mit.edu --recv D101F7899D41F3C3 && \
    echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update -qq && \
    apt-get install -y -qq yarn && \
    yarn --version

WORKDIR /opt/app

COPY package.json yarn.lock ./

COPY scripts/postinstall ./scripts/postinstall

RUN yarn install --production

ENV NODE_ENV=production \
    SECRET_KEY=secret

COPY . .

RUN yarn run build

CMD ["dumb-init", "yarn", "start"]
