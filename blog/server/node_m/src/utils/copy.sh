#!/bin/sh
cd G:/web/git/various-dev-blog/blog/server/node_m/logs
cp asscess.log $(date + %Y-%m-%d).access.log
echo ""> access.log 