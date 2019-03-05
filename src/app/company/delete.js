/**
  * function for getter company.
  */
module.exports = ({ companyRepository }) => {
  // code for getting all the items
  const remove = ({ id }) => {
    return Promise
      .resolve()
      .then(() =>
        companyRepository.update({
          isDeleted: 1
        }, {
          where: { id }
        })
      )
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    remove
  }
}
