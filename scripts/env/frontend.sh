#!/usr/bin/env bash

if [ -z "${RUNTIME_ENV}" ]; then
  export RUNTIME_ENV=client
fi

if [ -z "${RUN_MODE}" ]; then
  export RUN_MODE=es
fi
