#!/usr/bin/env bash

if [ -z "${NODE_ENV}" ]; then
  export NODE_ENV=production
fi

if [ -z "${PORT}" ]; then
  export PORT=3000
fi

if [ -z "${NODE_DEBUGGER}" ]; then
  export NODE_DEBUGGER=node-inspector
fi

if [ -z "${RUNTIME_ENV}" ]; then
  export RUNTIME_ENV=server
fi

if [ -z "${SECRET_KEY}" ]; then
  export SECRET_KEY=secret
fi

if [ -z "${SERVER_RENDERING}" ]; then
  export SERVER_RENDERING=0
fi
