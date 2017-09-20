
/**
 * We want to start here so we can manage other infrastructure
 * database
 * memcache
 * express server
 */
module.exports = ({ server, database }) => {
  return {
    start: () =>
      Promise
        .resolve()
        .then(database.authenticate)
        .then(server.start)
  }
}
