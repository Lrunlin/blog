@echo off
start cmd /k "cd server &&npm remove -g pm2&&npm i cross-env @socket.io/pm2 -g&& yarn config set sharp_binary_host https://npmmirror.com/mirrors/sharp && yarn config set sharp_libvips_binary_host https://npmmirror.com/mirrors/sharp-libvips && yarn&& exit"
start cmd /k "cd client&&yarn&& exit" 
