#!/usr/bin/env bash

npm run clean
npm run update-schema
npm run relay -- --watch & npm run frontend-watch & npm run backend-watch
