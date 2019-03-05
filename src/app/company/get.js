/**
  * function for getter company.
  */
module.exports = ({ companyRepository }) => {
  // code for getting all the items
  const all = () => {
    return Promise
      .resolve()
      .then(() =>
        companyRepository.getAll({
          attributes: [
            'id', 'name', 'address', 'contact', 'tin', 'sss', 'philhealth', 'isDeleted', 'createdBy', 'updatedBy'
          ]
        })
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all
  }
}
