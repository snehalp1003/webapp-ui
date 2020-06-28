#!/bin/bash
cd /home/ubuntu/webapp-ui
printenv
sudo npm run build
sudo npm run start
