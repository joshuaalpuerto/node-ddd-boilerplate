const container = require('src/container')
const router = require('./router')
const instance = require('./instance')

module.exports = () => {
  const { logger, response: { Success, Fail }, auth } = container.cradle
  const app = instance()

  return {
    app,
    router: router({ logger, auth, response: { Success, Fail }, ...app })
  }
}
