/**
 * this file will hold all the get use-case for company domain
 */
const { Company } = require('src/domain/company')

/**
  * function for getter company.
  */
module.exports = ({ companyRepository }) => {
  // code for getting all the items
  const create = ({ body }) => {
    return Promise
      .resolve()
      .then(() => {
        const company = Company(body)
        return companyRepository.create(company)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
