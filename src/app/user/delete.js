 /**
  * function for getter user.
  */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const remove = ({ id }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userEntity = await userRepository.update({
          isDeleted: 1
        }, {
          where: { id }
        })

        resolve(userEntity)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    remove
  }
}
