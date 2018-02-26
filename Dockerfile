FROM node:8 as builder

ARG SECRET_KEY=secret

WORKDIR /opt/application

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN npm run build


FROM node:8

ARG SECRET_KEY=secret

WORKDIR /opt/application

RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64
RUN chmod +x /usr/local/bin/dumb-init
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
COPY --from=builder /opt/application/public/assets ./public/assets
COPY --from=builder /opt/application/public/sw.js ./public/sw.js
COPY --from=builder /opt/application/build ./build

ENV NODE_ENV=production \
    SECRET_KEY=${SECRET_KEY}

CMD ["dumb-init", "npm", "start"]
