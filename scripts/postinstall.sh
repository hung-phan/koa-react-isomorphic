#!/usr/bin/env bash
if [[ $NODE_ENV = "production" ]]; then
  gulp build
fi