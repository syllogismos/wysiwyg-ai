#!/bin/sh

# git clone latest, npm install, download build files from s3, and pm2 restart

echo "Fetching latest master of dashboard"
git fetch --all
git reset --hard origin/master

echo "npm install new packages"
npm install


echo "downloading build from s3"
cd s3_build
s3cmd get s3://eschernode-dashboard-build/dist_s3_build.zip dist_s3_build.zip --force
rm -rf dist_build/
unzip dist_s3_build.zip
cd ../

echo "copying lates build to dist folder"
mkdir dist_old1
mkdir dist_old2
mkdir dist_old3
mkdir dist_old4
mkdir dist_old5
cp -r dist_old4/* dist_old5/
cp -r dist_old3/* dist_old4/
cp -r dist_old2/* dist_old3/
cp -r dist_old1/* dist_old2/
cp -r dist/* dist_old1/
cp -r s3_build/dist_build/* dist/

echo "restarting the express server using pm2"
pm2 restart server