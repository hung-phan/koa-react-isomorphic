#!/usr/bin/env bash

source $(dirname "$0")/env/frontend.sh
source $(dirname "$0")/env/development-build.sh
webpack-dev-server --config config/webpack/client/development.js
