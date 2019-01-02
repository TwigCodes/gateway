# TwigCodes 360-Degree Feedback System

## Run Locally

```bash
npm install
npm start
```

## Useful Commands

* `npm start` - starts a dev server and opens browser with running app
* `npm run test` - runs lint and tests
* `npm run watch` - runs tests in watch mode
* `npm run cy:open` - opens the Cypress Test Runner in interactive mode
* `npm run cy:run` - runs Cypress tests via the cli
* `npm run prod` - runs full prod build and serves prod bundle
* `npm run prettier` - runs prettier to format whole code base (`.ts` and `.scss`)
* `npm run analyze` - runs full prod build and `webpack-bundle-analyzer` to visualize how much code is shipped (dependencies & application)
* `npm run compodoc` - runs [Compodoc](https://compodoc.app) to generate a static documentation of the application

## Run Inside Docker Container

```bash
# builds docker image with name `tgapp`
docker build -t tgapp .
```

The following command starts `tgapp` container (you can access running application browsing <http://localhost:4200>)

```bash
docker run -it \
   -v ${PWD}:/usr/src/app \
   -v /usr/src/app/node_modules \
   -p 4200:4200 \
   --rm \
   tgapp
```

### Serving a Docker image

When you are ready to serve your application, the process has been made simple through the use of `Production.Dockerfile` and `Production.docker-compose.yml`.

From the root directory of the project simply run `docker-compose -f Production.docker-compose.yml build`. After this has run you can test your image locally by running `docker-compose -f Production.docker-compose.yml up`. Run `docker-compose -f Production.docker-compose.yml down` once you are done looking over the website so that docker cleans up all the resources related to it.

Npm scripts are also available to save having to write such a long command.

#### Npm Scripts

The following npm scripts correspond to the docker-compose commands.

| Npm Script       | Docker Compose       |
| ---------------- | -------------------- |
| docker:prod      | docker-compose build |
| docker:prod-up   | docker-compose up    |
| docker:prod-down | docker-compose down  |

## Stack

* Angular
* ngrx
* Angular Material
* Bootstrap 4 (only reset, utils and grids)

## Troubleshooting

* **Blocking at emitting LicenseWebpackPlugin when npm start** - try using [cnpm](https://github.com/cnpm/cnpm) instead of npm

