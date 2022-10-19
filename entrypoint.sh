#!/bin/bash

concurrently "pm2 start dist/lootie-ui-temp/server/main.js --name lootie-dev-ui" "nginx -c /etc/nginx/nginx.conf -g 'daemon off;'"
