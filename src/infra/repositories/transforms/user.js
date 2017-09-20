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
  createdBy
}) => User({
  id,
  firstName,
  lastName,
  middleName,
  email,
  password,
  roleId,
  isDeleted,
  createdBy
})

module.exports = {
  toEntity
}
