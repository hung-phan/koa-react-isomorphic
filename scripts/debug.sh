#!/usr/bin/env bash

source $(dirname "$0")/env/debug.sh
node --inspect prod-server.js
