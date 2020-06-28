#!/bin/bash
cd /home/ubuntu/webapp-ui
printenv
pm2 start node_modules/react-scripts/scripts/start.js --name "webapp-ui"
