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
cp -r dist_build/* dist/