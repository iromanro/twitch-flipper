# variables
DIST_DIR=dist # distribution directory
PUBLIC_DIR=public # static files directory

# remove old distribution
rm -rf $DIST_DIR

# create new distribution directory
mkdir -p $DIST_DIR

# copy static files
cp $PUBLIC_DIR/* $DIST_DIR

# build popup app. this overwrites the previously-copied static index.html 
# file with one created by the build itself.
npx react-scripts build

# copy popup assets
cp -r build/* $DIST_DIR

# build assets for chrome process
npx parcel build src/background/background.js --dist-dir $DIST_DIR
npx parcel build src/content/controls.js --dist-dir $DIST_DIR