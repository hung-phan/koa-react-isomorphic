#!/usr/bin/env bash
if [ -z "${NODE_ENV}" ]; then
  export NODE_ENV=${1:-production}
fi

if [ -z "${PORT}" ]; then
  export PORT=${2:-3000}
fi

node prod-server.js
