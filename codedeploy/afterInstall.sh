echo "Running after install script"
cd /home/ubuntu/webapp-ui
npm install
sudo chown -R ubuntu:ubuntu /home/ubuntu/*
sudo chmod +x /webapp-ui

#Kill application if already running
kill -9 $(ps -ef|grep webapp-ui | grep -v grep | awk '{print $2}')

source /etc/environment
#Running application and appending logs
#nohup node /webapp-ui/bin/www > webapp.log 2> webapp_err.log &
