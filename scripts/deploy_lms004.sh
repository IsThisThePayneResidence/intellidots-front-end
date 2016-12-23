#!/usr/bin/env bash
cp -r ../dist/public/ ../dist/html/
scp -r -P 7124 ../dist/html/ root@172.16.28.53:/usr/share/nginx/
rm -r ../dist/html/
