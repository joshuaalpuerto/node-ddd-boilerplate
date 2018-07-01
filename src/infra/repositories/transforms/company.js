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
  createdBy,
  updatedBy
}) => Company({
  id,
  name,
  address,
  contact,
  tin,
  sss,
  philhealth,
  isDeleted,
  createdBy,
  updatedBy
})

module.exports = {
  toEntity
}
