/**
 * this file will hold all the get use-case for company domain
 */
const { Company } = require('src/domain/company')

/**
  * function for getter company.
  */
module.exports = ({ companyRepository }) => {
  // code for getting all the items
  const update = ({ id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const company = Company(body)
        await companyRepository.update(company, {
          where: { id }
        })

        resolve(company)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    update
  }
}
