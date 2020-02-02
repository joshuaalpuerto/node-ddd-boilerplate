const express = require('express')
const { createTerminus, HealthCheckError } = require('@godaddy/terminus')

// Healthchecks
const readinessProbe = ({ http, database }) => async () => {
  const isServerListening = http.listening
  const isDBConnected = await database.authenticate()
  if (!isDBConnected || !isServerListening) {
    throw HealthCheckError
  }
}

module.exports = ({ config, router, logger, auth, database }) => {
  const app = express()

  app.disable('x-powered-by')
  app.use(auth.initialize())
  app.use(router)

  // we define our static folder
  app.use(express.static('public'))

  return {
    app,
    start: () =>
      new Promise(resolve => {
        const terminusOptions = {
          healthChecks: {
            '/livez': () => {},
            '/readyz': readinessProbe({ app, database })
          }
        }

        createTerminus(app, terminusOptions)

        const http = app.listen(config.port, () => {
          const { port } = http.address()
          logger.info(`🤘 API - Port ${port}`)
        })
      })
  }
}
