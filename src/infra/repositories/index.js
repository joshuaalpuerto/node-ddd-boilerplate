const User = require('./user')
const Company = require('./company')

module.exports = ({ database }) => {
  const userModel = database.models.users
  const companyModel = database.models.companies

  return {
    userRepository: User({ model: userModel }),
    companyRepository: Company({ model: companyModel })
  }
}
