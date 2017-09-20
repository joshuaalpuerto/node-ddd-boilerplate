 /**
  * function for getter company.
  */
module.exports = ({ companyRepository }) => {
  // code for getting all the items
  const remove = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const companyEntity = await companyRepository.update({
          isDeleted: 1
        }, {
          where: { id }
        })

        resolve(companyEntity)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    remove
  }
}
