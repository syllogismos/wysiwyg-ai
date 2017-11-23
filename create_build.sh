#!/bin/sh

# creates the build and uploads to s3
rm s3_build/dist_s3_build.zip
npm run build
zip -r s3_build/dist_s3_build.zip dist_build

s3cmd put s3_build/dist_s3_build.zip s3://eschernode-dashboard-build --force

ssh ubuntu@52.2.113.244 "cd dashboard; sh release_build.sh"
