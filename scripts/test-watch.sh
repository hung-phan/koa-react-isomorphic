#!/usr/bin/env bash
if [ -z "${NODE_ENV}" ]; then
  export NODE_ENV=${1:-test}
fi

if [ -z "${PORT}" ]; then
  export PORT=${2:-3001}
fi

mocha --watch --reporter progress --compilers js:./compiler './app/**/*-test.js' './tests/**/*.js'