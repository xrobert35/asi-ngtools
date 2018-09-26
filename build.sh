### Build in prod mode
ng build --prod asi-ng-tools

echo "Copy and build styles..."
### Copy styles
./node_modules/.bin/copyfiles -u 5  projects/asi-ng-tools/src/lib/styles/less/* dist/asi-ng-tools/styles
### Buid less
lessc dist/asi-ng-tools/styles/less/asingtools.less  dist/asi-ng-tools/styles/styles.css

echo "Copying readme..."
### Copy readme
./node_modules/.bin/copyfiles README.md dist/asi-ng-tools
