
const container = require('src/container') // we have to get the DI
const { get, post, put, remove } = require('src/app/user')

module.exports = () => {
  const { repository: {
    userRepository
  } } = container.cradle

  const getUseCase = get({ userRepository })
  const postUseCase = post({ userRepository })
  const putUseCase = put({ userRepository })
  const deleteUseCase = remove({ userRepository })

  return {
    getUseCase,
    postUseCase,
    putUseCase,
    deleteUseCase
  }
}
