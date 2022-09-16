#!/usr/bin/env sh

# abort on errors

set -e

# build

npm run build

# navigate into the build output directory

# if you are deploying to a custom domain

# echo 'www.judah.brk' -> CNAME

commitdatetime=

cd dist

git init

git add -A

git commit -m "`date -u +%Y%m%d%H%M%S`, deploy"

git push -f git@github.com:judahburke/esoteric-card-vue.git master:gh-pages

cd -