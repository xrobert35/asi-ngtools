### Build in prod mode
ng run asi-ngtools:build:production

echo "Copy and build styles..."
### Copy styles
./node_modules/.bin/copyfiles -u 5  projects/asi-ngtools/src/lib/styles/less/* dist/asi-ngtools/styles
### Buid less
lessc dist/asi-ngtools/styles/less/asingtools.less  dist/asi-ngtools/styles/styles.css

echo "Copying readme..."
### Copy readme
./node_modules/.bin/copyfiles README.md dist/asi-ngtools
