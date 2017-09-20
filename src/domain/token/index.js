const t = require('tcomb')

const Token = t.struct({
  email: t.String,
  password: t.String
})

module.exports = Token
