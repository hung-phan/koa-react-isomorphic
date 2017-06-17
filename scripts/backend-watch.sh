#!/usr/bin/env bash

source $(dirname "$0")/env/backend.sh
source $(dirname "$0")/env/development-build.sh
webpack --watch --config config/webpack/server/development.js
