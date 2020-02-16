const { createTerminus, HealthCheckError } = require('@godaddy/terminus')

module.exports = ({ database }) => {
  // Healthchecks
  const readinessProbe = app => async () => {
    const isServerListening = app.listening
    const isDBConnected = await database.authenticate()
    if (!isDBConnected || !isServerListening) {
      throw HealthCheckError
    }

    return true
  }

  return {
    start: app =>
      createTerminus(app, {
        '/livez': () => {},
        '/readyz': readinessProbe
      })
  }
}
