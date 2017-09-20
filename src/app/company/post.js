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
    return new Promise(async (resolve, reject) => {
      try {
        const company = Company(body)
        const companyEntity = await companyRepository.create(company)

        resolve(companyEntity)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    create
  }
}
