# Blitar Smart City Dashboard

## Run metabase

To run metabase as business intelligence platform, open directory `bi-platform` then follow the steps in `README.md`

## Run dashboard

### Setup environment to run dashboard

To prepare command-center, use the following steps:

- Install [Chocolatey](https://chocolatey.org/install)
- Install NodeJS LTS using `choco install nodejs-lts`
- Open directory `dashboard` \ `src`
- Initialise the project by installing dependencies by running `npm install`
- Using elevated priviledge command line, install [Grunt](https://gruntjs.com) as JavaScript task runner using command `npm install -g grunt-cli` _(if you unable to use `grunt` in CLI, with message **'grunt' is not recognized as an internal or external command, operable program or batch file** make sure `%USERPROFILE%\AppData\Roaming\npm` is registered in the machine's `PATH` environment variable)_

### Run dashboard app

Inside directory `dashboard` \ `src`, run these command:

- Build minified CSS and JavaScript files using `grunt dist`
- Compile CSS and JavaScript files then auto recompile if sass file modified using command: `npm run build-frontend-watch`
- Ensure all JSX components synced: `npm run build-react-watch`
- Run server and auto-reload using command: `npm run start-dev`
