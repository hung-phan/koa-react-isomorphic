#!/usr/bin/env bash

source $(dirname "$0")/env/backend.sh
source $(dirname "$0")/env/production.sh
webpack --config config/webpack/server/production.js
