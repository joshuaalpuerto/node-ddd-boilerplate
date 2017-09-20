module.exports = {
  version: process.env.APP_VERSION || 'v1',
  port: process.env.PORT || 4000,
  timezone: process.env.TIMEZONE || 'Asia/Manila',
  logging: {
    maxsize: 100 * 1024, // 100mb
    maxFiles: 2,
    colorize: false
  },
  authSecret: process.env.SECRET || '@p!p@yr0ll123',
  authSession: {
    session: false
  }
}
