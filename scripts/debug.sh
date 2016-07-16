#!/usr/bin/env bash
if [ -z "${NODE_ENV}" ]; then
  export NODE_ENV=${1:-production}
fi

if [ -z "${PORT}" ]; then
  export PORT=${2:-3000}
fi

if [ -z "${NODE_DEBUGGER}" ]; then
  export NODE_DEBUGGER=${3:-node-inspector}
fi

if [ -z "${RUNTIME_ENV}" ]; then
  export RUNTIME_ENV=${4:-server}
fi

if [ -z "${SECRET_KEY}" ]; then
  export SECRET_KEY=${5:-secret}
fi

if [ -z "${SERVER_RENDERING}" ]; then
  export SERVER_RENDERING=${6:-0}
fi

node-debug -p 9999 -b prod-server.js
