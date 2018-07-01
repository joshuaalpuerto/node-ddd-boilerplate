const { User } = require('src/domain/user')

const toEntity = ({
  id,
  firstName,
  lastName,
  middleName,
  email,
  password,
  roleId,
  isDeleted,
  createdBy,
  updatedBy
}) => User({
  id,
  firstName,
  lastName,
  middleName,
  email,
  password,
  roleId,
  isDeleted,
  createdBy,
  updatedBy
})

module.exports = {
  toEntity
}
