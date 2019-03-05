/**
  * function for getter user.
  */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const all = () => {
    return Promise
      .resolve()
      .then(() =>
        userRepository.getAll({
          attributes: [
            'id', 'firstName', 'lastName', 'middleName', 'email', 'roleId', 'isDeleted', 'createdBy', 'updatedBy'
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
