#!/usr/bin/env bash

source $(dirname "$0")/env/frontend.sh
source $(dirname "$0")/env/production-build.sh
webpack --config config/webpack/client/production.js
