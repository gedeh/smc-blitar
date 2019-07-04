# Getting Started

## Public asset files

Dashboard use grunt to build the assets in `public` directory:
- Run `grunt dist` to generate the public assets
- Adding or modifying asset should modify the asset in template `directory`
- The `grunt monitor` task will compile `*.scss` and `*.js` files inside `template` directory then copy them to `public`
- When you add new JavaScript file, remember to modify `uglify:dist` task in `Gruntfile.js`