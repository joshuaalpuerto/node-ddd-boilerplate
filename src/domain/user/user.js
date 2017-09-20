const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const User = t.struct({
  id: t.maybe(t.String),
  firstName: t.String,
  lastName: t.String,
  middleName: t.String,
  email: t.String,
  password: t.maybe(t.String),
  roleId: t.Number,
  verificationCode: t.maybe(t.String),
  isVerified: t.maybe(t.Number),
  isDeleted: t.Number,
  createdBy: t.String
})

module.exports = compose(
  cleanData,
  User
)
