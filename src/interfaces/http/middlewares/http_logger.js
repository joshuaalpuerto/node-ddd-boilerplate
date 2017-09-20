const morgan = require('morgan')

module.exports = (logger) => {
  return morgan('common', {
    stream: {
      write: (message) => {
        logger.info(message.slice(0, -1))
      }
    }
  })
}
