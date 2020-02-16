const express = require('express')

module.exports = ({ config, router, logger, auth, database, health }) => {
  const app = express()

  app.disable('x-powered-by')
  app.use(auth.initialize())
  app.use(router)

  // we define our static folder
  app.use(express.static('public'))

  return {
    app,
    setupHealthCheck: () =>
      new Promise(resolve => {
        resolve(health.start(app))
      }),
    start: () =>
      new Promise(resolve => {
        const http = app.listen(config.port, () => {
          const { port } = http.address()
          logger.info(`🤘 API - Port ${port}`)
        })
      })
  }
}
