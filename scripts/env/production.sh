#!/usr/bin/env bash

if [ -z "${NODE_ENV}" ]; then
  export NODE_ENV=production
fi

if [ -z "${PORT}" ]; then
  export PORT=3000
fi
