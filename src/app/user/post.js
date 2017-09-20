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
    return new Promise(async (resolve, reject) => {
      try {
        const password = body.password || 'test'
        const entity = Object.assign({}, body, {
          password
        })
        const user = User(entity)
        const userEntity = await userRepository.create(user)

        resolve(userEntity)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    create
  }
}
