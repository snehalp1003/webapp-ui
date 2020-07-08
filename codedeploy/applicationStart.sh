#!/bin/bash
cd /home/ubuntu/webapp-ui
printenv
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
pm2 start node_modules/react-scripts/scripts/start.js --name "webapp-ui"
pm2 save
pm2 resurrect
