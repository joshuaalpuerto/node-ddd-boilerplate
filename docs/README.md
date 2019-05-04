# Node DDD Boilerplate
> RESTful api with Domain Driven Design

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![Travis CI](https://travis-ci.org/joshuaalpuerto/node-ddd-boilerplate.svg?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![Dependecies](https://david-dm.org/joshuaalpuerto/node-ddd-boilerplate/status.svg)
![Dev Dependecies](https://david-dm.org/joshuaalpuerto/node-ddd-boilerplate/dev-status.svg)
[![Coverage Status](https://coveralls.io/repos/github/joshuaalpuerto/node-ddd-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/joshuaalpuerto/node-ddd-boilerplate?branch=master)

## Development Environment Setup

1.  Make sure you have `nvm`, node `v10.7` or `LTS` version of node installed
2.  Install `yarn` - `npm install -g yarn`.
3.  Use a smart `.npmrc`. By default, `npm` doesn’t save installed dependencies to package.json (and you should always track your dependencies!).

## Docker support

**Prerequisites**
1. [Docker](https://www.docker.com/products/docker-engine) Community Edition v17 or higher

```sh
$ docker-compose up -d
```
Access `http://localhost:<PORT>/api/<VERSION>` and you're ready to go!
> http://localhost:4000/api/v1

### Docker CLI
- `yarn docker:db:reset` - reset and run all migrations and seeders.
- `yarn docker:db:refresh` - reset and run all migrations.
- `yarn docker:db:refresh-test` - reset and run all migrations for test
- `yarn docker:test` - refreshes test database and run unit and black-box testing.

*...will add more*

## Quick Start

1. Clone the repository with `git clone --depth=1 https://github.com/joshuaalpuerto/node-ddd-boilerplate.git`
2. Install the dependencies with [Yarn](https://yarnpkg.com/en/docs/install/)
3. Install global dependencies [Application Setup](https://github.com/joshuaalpuerto/node-ddd-boilerplate#application-setup-development)
4. Create the development and test [Databases](https://github.com/joshuaalpuerto/node-ddd-boilerplate#database-setup-development)
5. Run database migrations and seed with `yarn db:refresh`
6. Run the application in development mode with `yarn start`
7. Access `http://localhost:<PORT>/api/<VERSION>` and you're ready to go!
    > http://localhost:4000/api/v1

### Application Setup (Development)

```sh
$ npm install -g standard   # JavaScript Standard Style
$ npm install -g babel-eslint  # required by StandardJs
$ npm install -g snazzy   # Format JavaScript Standard Style as beautiful output
$ npm install -g sequelize-cli  # CLI for Sequelize
```

### Database Setup (Development)

1. Install [PostgreSql](https://www.postgresql.org/) - v9.6.
2. Create an empty database named - `node_ddd` and `node_ddd_test` for test enviroment.
3. Rename the .env and populate it with the correct credentials and settings of your Postgresql databases
4. Enable SSL in the `postgresql.conf` configuration file of your Postgresql installation.

Follow the the steps in the next section to enable Posgresql SSL connections.

```sh
$ psql
psql (9.6.0)
Type "help" for help.

$ CREATE DATABASE node_ddd;
$ CREATE DATABASE node_ddd_test;
```

## Overview

- uses Node.js > v9
- written using ES6
- uses Yarn for package dependency management
- uses [JavaScript Standard Style](http://standardjs.com/)
- uses `sequelize` and `sequelize-cli` as ORM and data migration tool
  > can change easily to diffrent ORM and migration tool.
- Filename convention - `camelCase` should never be used. This leaves `snake_case` and `kebab-case`, I prefer `snake_case` for file.

## CLI Tools

- `yarn start` - start the Node-DDD API Boilerplate for production
- `yarn start:dev` - start the Node-DDD API Boilerplate locally/development
- `yarn start:cc` - start `codecrumbs` will give you quick overview the structure of the project
- `yarn test` - run Unit tests
- `yarn db:reset` - run all migrations and seeds.
- `yarn db:refresh` - run all migrations.
- `yarn lint` - lint codebase using JavaScript Standard Style
- `yarn lint:fix` - fix code according to JS Standard Style
- `yarn migrate` - apply db changes using migration script
- `yarn add <package-name>` - add a new package to package.json
- `yarn remove <package-name>` - remove package from package.json
- `npx sequelize model:create --name newmodel` --attributes "id:integer, title:string - create a new model

## Using Sequelize

Sequelize is used to define mappings between models and database tables. It will automatically add the attributes `created_at` and `updated_at` to the tables created. However for consistency for our naming we change this to `createdAt` and `updatedAt`. This will cause issue when using model so we have to add this on config:

```js
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
    ...
  }, {
    timestamps: false, // Add this
  })
}
```

Basic commands

```sh
$ sequelize  db:migrate             Run pending migrations.
$ sequelize  db:migrate:old_schema  Update legacy migration table
$ sequelize  db:migrate:undo        Revert the last migration run.
$ sequelize  db:migrate:undo:all    Revert all migrations ran.
$ sequelize  db:seed                Run seeders.
$ sequelize  db:seed:undo           Deletes data from the database.
$ sequelize  db:seed:undo:all       Deletes data from the database.
$ sequelize model:create --name modelname --attributes "text:text, url:string"  # create model
$ sequelize seed:create     # create seeder
```

> If you did not install your sequelize-cli globally you can run this commands by `npx`

#### Setting up associations — migration and model files
**IMPORTANT**: as of `6/23/17` the model file created with the `sequelize db:model` command still initializes a model with an empty `classMethods` object with an `associate` property in the options passed to `sequelize.define` method. **You cannot define associations this way anymore as of Sequelize v4.0.0-1.** This tripped me up for a hot second because the generated model file did not reflect this change, and the fact that support for the old way had been removed is seemingly buried in the changelogs. Don’t make the same mistake I did and be super confused for too long about why associations aren’t working.

```js
//old way that will be included in your generated model file
module.exports = function(sequelize, DataTypes) {
  var nameofmodel = sequelize.define('nameofmodel', {
    ...model attributes
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  })
  return nameofmodel
};
//The right way to set associations in model files
module.exports = function(sequelize, DataTypes) {
  var nameofmodel = sequelize.define('nameofmodel', {
    ...model attributes
  });

  nameofmodel.associate = function (models) {
    // associations can be defined here
  };
  return nameofmodel
}
```
### Sequelize CLI Documentation

For reference, see: [https://github.com/sequelize/cli](https://github.com/sequelize/cli)

## Tech

- [Express](https://expressjs.com/) - Node Framweork
- [Awilix](https://github.com/jeffijoe/awilix) - dependency resolution support powered by `Proxy`
- [PM2](https://github.com/Unitech/pm2) - production process manager for Node.js applications with a built-in load balancer
- [Nodemon](https://nodemon.io/) - Use for development file reload.
- [Tcomb](https://github.com/gcanti/tcomb) - s a library for Node.js and the browser which allows you to check the types of JavaScript values at runtime with a simple and concise syntax
- [Express-status-monitor](https://github.com/RafalWilinski/express-status-monitor) - Simple, self-hosted module based on Socket.io and Chart.js to report realtime server metrics for Express-based node servers.
- [CORS](https://github.com/expressjs/cors) - a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [Body-parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware.
- [Compression](https://github.com/expressjs/compression) - Node.js compression middleware.
- [Http-status](https://github.com/adaltas/node-http-status) - Utility to interact with HTTP status code.
- [Winston](https://github.com/winstonjs/winston) - A multi-transport async logging library for node.js.
- [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
- [Ramda](http://ramdajs.com/) - A practical functional library for JavaScript programmers.
- [Sequelize](http://docs.sequelizejs.com/) - promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
- [Faker](https://github.com/marak/Faker.js/) - generate massive amounts of fake data in the browser and node.js
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Lib to help you hash passwords
- [Passport](https://github.com/jaredhanson/passport) - is Express-compatible authentication middleware for Node.js.
- [Passport-jwt](https://github.com/themikenicholson/passport-jwt) - A Passport strategy for authenticating with a JSON Web Token.
- [Json Webtoken](https://github.com/auth0/node-jsonwebtoken) - An implementation of JSON Web Tokens.
- [Moment](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript.
- [Moment-timezone](https://momentjs.com/timezone/) - Parse and display dates in any timezone.
- [Swagger-ui](https://swagger.io/swagger-ui/) - visualize and interact with the API’s resources without having any of the implementation logic in place.
- [Swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)- enables you to integrate Swagger using JSDoc comments in your code. Just add @swagger on top of your DocBlock and declare the meaning of your code in yaml complying to the OpenAPI specification.

### Logging
- [winston](https://github.com/winstonjs/winston) - a multi-transport async logging library for Node.js. It is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file.
- [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for Node.js. A helper that collects logs from your server, such as your request logs.

### Tests
- [mocha](https://mochajs.org/) - JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun
- [chai](http://chaijs.com/) - a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
- [supertest](https://github.com/visionmedia/supertest) - HTTP assertions made easy via superagent.
- [cross-env](https://github.com/kentcdodds/cross-env) - makes it so you can have a single command without worrying about setting or using the environment variable properly for the platform
  - We mainly use this so **mocha** can use the absolute path of files

### Pre-commit

Adding `pre-commit` to your project can be helpful to encourage consistency and quality of your code repository.

- [pre-commit](https://github.com/observing/pre-commit) - **pre-commit** is a pre-commit hook installer for `git`. It will ensure that your `npm test` (or other specified scripts) passes before you can commit your changes. This all conveniently configured in your `package.json`.
- [lint-staged](https://github.com/okonet/lint-staged) - Linting makes more sense when running before committing your code. By doing that you can ensure no errors are going into repository and enforce code style. But running a lint process on a whole project is slow and linting results can be irrelevant. Ultimately you only want to lint files that will be committed.

## JavaScript Standard Style

### The Rules

- **2 spaces** – for indentation
- **Single quotes for strings** – except to avoid escaping
- **No unused variables** – this one catches *tons* of bugs!
- **No semicolons** – [It's][1] [fine.][2] [Really!][3]
- **Never start a line with `(`, `[`, or `` ` ``**
  - This is the **only** gotcha with omitting semicolons – *automatically checked for you!*
  - [More details][4]
- **Space after keywords** `if (condition) { ... }`
- **Space after function name** `function name (arg) { ... }`
- Always use `===` instead of `==` – but `obj == null` is allowed to check `null || undefined`.
- Always handle the node.js `err` function parameter
- Always prefix browser globals with `window` – except `document` and `navigator` are okay
  - Prevents accidental use of poorly-named browser globals like `open`, `length`,
    `event`, and `name`.
- **And [more goodness](https://standardjs.com/)**

## Contributing

This boilerplate is open to suggestions and contributions, documentation contributions are also important! :)

## Acknowledgments
This boilerplate is forked and modified from [node-api-boilerplate](https://github.com/talyssonoc/node-api-boilerplate) - [Talysson de Oliveira Cassiano](https://github.com/talyssonoc) :clap:

## License
MIT License - fork, modify and use however you want.


