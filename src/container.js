const { createContainer, asValue, asFunction, InjectionMode } = require('awilix')
// you can do this
const app = require('./app')
const server = require('./interfaces/http/server')
const router = require('./interfaces/http/router')
const auth = require('./interfaces/http/auth')
const config = require('../config')
const logger = require('./infra/logging/logger')
const database = require('./infra/database')
const jwt = require('./infra/jwt')
const response = require('./infra/support/response')
const date = require('./infra/support/date')
const repository = require('./infra/repositories')
const health = require('./infra/health')

const container = createContainer({
  injectionMode: InjectionMode.PROXY, // default inejction
  //  It enables additional correctness checks that can help you catch bugs early.
  // specialy with singleton values (stale cache issues)
  // read more here https://github.com/jeffijoe/awilix?tab=readme-ov-file#strict-mode
  strict: true
})

// SYSTEM
container
  .register({
    app: asFunction(app).singleton(),
    server: asFunction(server).singleton(),
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
    database: asFunction(database).singleton(),
    auth: asFunction(auth).singleton(),
    jwt: asFunction(jwt).singleton(),
    response: asFunction(response).singleton(),
    date: asFunction(date).singleton(),
    config: asValue(config),
    repository: asFunction(repository).singleton(),
    health: asFunction(health).singleton()
  })

module.exports = {
  // could be singler dependency or array
  resolve: (dependency) => {
    // E.g.
    // const { logger, response: { Success, Fail }, auth } = container.resolve(['logger', 'response', 'auth'])
    if (Array.isArray(dependency)) {
      return dependency.reduce((deps, dep) => ({
        ...deps,
        [dep]: container.resolve(dep)
      }), {})
    }

    // eg. const jwt  = container.resolve('jwt')
    return container.resolve(dependency)
  }
}
