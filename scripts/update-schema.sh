#!/usr/bin/env bash

if [ ! -f build/schema.graphql ]; then
    mkdir -p build && touch build/schema.graphql
fi

babel-node ./scripts/create-schema.js
