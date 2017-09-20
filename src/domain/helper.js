
const { complement, compose, isNil, pickBy } = require('ramda')

const notNull = compose(complement(isNil))
/**
 * we need to remove undefined array means not required data.
 */
const cleanData = (entity) => pickBy(notNull, entity)

module.exports = {
  cleanData
}
