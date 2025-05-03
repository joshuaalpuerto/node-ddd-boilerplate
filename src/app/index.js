
/**
 * We want to start here so we can manage other infrastructure
 * database
 * memcache
 * express server
 */
module.exports = ({ server, database }) => {
  return {
    start: () =>
      database.authenticate()
        .then(server.setupHealthCheck)
        .then(server.start),
    close: () =>
      database.close()

  }
}
