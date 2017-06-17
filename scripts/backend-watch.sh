#!/usr/bin/env bash

source $(dirname "$0")/env/backend.sh
source $(dirname "$0")/env/development.sh
webpack --watch --config config/webpack/server/development.js
