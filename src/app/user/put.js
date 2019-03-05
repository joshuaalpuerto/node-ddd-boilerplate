/**
 * this file will hold all the get use-case for user domain
 */
const { User } = require('src/domain/user')

/**
  * function for getter user.
  */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const update = ({ id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = User(body)
        await userRepository.update(user, {
          where: { id }
        })

        resolve(user)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    update
  }
}
