const container = require('src/container')
const app = container.resolve('app')

app
  .start()
  .catch((error) => {
    app.logger.error(error.stack)
    process.exit()
  })



function exitHandler(exitCode = 0) {
  app.close();
  app.logger.info('Exiting with code:', exitCode);
  process.exit(exitCode);
}

const unexpectedErrorHandler = (error) => {
  app.logger.error(error);
  exitHandler(1);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', (_, code) => exitHandler(code));
process.on('SIGINT', (_, code) => exitHandler(code));
