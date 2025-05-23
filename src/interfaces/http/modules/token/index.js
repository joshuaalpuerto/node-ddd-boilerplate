const container = require('src/container')
const router = require('./router')
const instance = require('./instance')

module.exports = () => {
  const { logger, response: { Success, Fail }, jwt } = container.resolve(['logger', 'response', 'jwt'])
  const app = instance()

  return {
    app,
    router: router({ logger, jwt, response: { Success, Fail }, ...app })
  }
}
