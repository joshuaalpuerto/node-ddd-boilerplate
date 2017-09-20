const { Company } = require('src/domain/company')

const toEntity = ({
  id,
  name,
  address,
  contact,
  tin,
  sss,
  philhealth,
  isDeleted,
  createdBy
}) => Company({
  id,
  name,
  address,
  contact,
  tin,
  sss,
  philhealth,
  isDeleted,
  createdBy
})

module.exports = {
  toEntity
}
