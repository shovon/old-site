mkdir -p src/tmp/src
cp -r src/js* src/tmp/src
rm -rf ./-p

# Compile the CoffeeScript files to JavaScript in a src/tmp/bin/js directory.
if [[ $1 = "compress" || $2 = "compress" ]]
	then
	cake.sh build:compress
else
	cake.sh build 
fi

# Copy the JavaScript files to the binary folder.
mkdir -p bin/js
cp -r src/tmp/bin/js* bin
rm -rf ./-p

# Compile the SASS files.
compass compile src/scss/

# Copy the images to the img folder.
mkdir -p bin/css/img
cp -r src/scss/img* bin/css
rm -rf ./-p

rm -rf src/tmp

if [[ $1 = "run" || $2 = "run" ]];
	then
	jekyll --server
fi