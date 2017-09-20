const { createContainer, Lifetime } = require('awilix')

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

const container = createContainer()

// SYSTEM
container
  .registerFunction({
    app: [app, { lifetime: Lifetime.SINGLETON }],
    server: [server, { lifetime: Lifetime.SINGLETON }],
    router: [router, { lifetime: Lifetime.SINGLETON }],
    logger: [logger, { lifetime: Lifetime.SINGLETON }],
    database: [database, { lifetime: Lifetime.SINGLETON }],
    auth: [auth, { lifetime: Lifetime.SINGLETON }],
    jwt: [jwt, { lifetime: Lifetime.SINGLETON }],
    response: [response, { lifetime: Lifetime.SINGLETON }],
    date: [date, { lifetime: Lifetime.SINGLETON }]
  })
  .registerValue({ config })

module.exports = container
