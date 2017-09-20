const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const Company = t.struct({
  id: t.maybe(t.String),
  name: t.String,
  address: t.String,
  contact: t.String,
  tin: t.String,
  sss: t.String,
  philhealth: t.String,
  isDeleted: t.Number,
  createdBy: t.String
})

module.exports = compose(
  cleanData,
  Company
)
