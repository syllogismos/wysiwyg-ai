#!/bin/sh

# creates the build and uploads to s3
echo "removing old zip file"
rm s3_build/dist_s3_build.zip
echo "Creating new build"
npm run build
echo "Creating zip file"
zip -rq s3_build/dist_s3_build.zip dist_build

echo "copy build zip file to s3"
s3cmd put s3_build/dist_s3_build.zip s3://eschernode-dashboard-build --force

echo "restart server remotely"
ssh ubuntu@52.2.113.244 "cd dashboard; git fetch --all; git reset --hard origin/master; sh release_build.sh"
