/**
 * this file will hold all the get use-case for user domain
 */
const { User } = require('src/domain/user')
/**
  * function for getter user.
  */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const create = ({ body }) => {
    return Promise
      .resolve()
      .then(() => {
        const password = body.password || 'test'
        const entity = Object.assign({}, body, {
          password
        })
        const user = User(entity)
        return userRepository.create(user)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
