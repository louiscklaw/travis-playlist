#!/usr/bin/env bash

set -ex


gatsby new .

yarn add prettier --dev --exact

yarn add gatsby-plugin-offline

mkdir static
mkdir src/templates
mkdir plugins

gatsby build

cp .cache/default-html.js src/html.js

git add .

yarn develop
