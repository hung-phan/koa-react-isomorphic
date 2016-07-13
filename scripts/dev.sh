#!/usr/bin/env bash
if [ -z "${NODE_ENV}" ]; then
  export NODE_ENV=${1:-development}
fi

if [ -z "${PORT}" ]; then
  export PORT=${2:-3000}
fi

nodemon prod-server.js
