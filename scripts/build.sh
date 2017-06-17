#!/usr/bin/env bash

npm run clean
npm run compile-templates & npm run frontend-build & npm run backend-build & wait
