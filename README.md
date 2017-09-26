# Angular 4, Express 4 Hackathon starter

## First

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.3.

* `git clone`
* Install `node`, `nodemon`
* cd `my-app`
* `npm install`

And after that a basic express app is set up, with `server.js` as the starting point for express, and `/server` folder containing all the `/api/` server side routes. All the `/api` routes will be served by express and the rest of the routes will be served by angular/frontend. When you build the front end using `-prod` flag all the minified and js and css front end build files will be generated in `/dist` and express is setup up to load the `/dist` directory statically.

## Development Setup

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

And `nodemon server.js --watch server` will start the express server. Navigate to `http://localhost:3000`. The server side scripts will automatically take into effect when the `/server` files change.

While development there wont be any `/dist` files, hence you will access the `/api` express server by using a proxy config while serving angular front end files. You can find the proxy config in `./proxy.config.json` file in the home directory. And you start angular with `ng serve --proxy-config proxy.config.json`. Basically this proxy config directs all the `localhost:4200/api` requests to `localhost:3000/api` where our development express is live reloading its own server code.

This command is also defined in the `package.json` as `npm start`

So this is how you develop
* `mongod --dbpath mongo_data` to start your mongo db
* `nodemon server.js --watch server` in a terminal
* `npm start` in another terminal
* Go to `localhost:4200`
* Modify express server side stuff(`server.js` and `./server`) and angular stuff (rest of the code)

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

And start the express server with `node server.js` and browse `localhost:3000`

## Running unit tests(Angular)

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests(Angular)

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

