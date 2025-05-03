const container = require('src/container')
const get = require('./get')
const post = require('./post')
const put = require('./put')
const remove = require('./delete')

const { repository: {
  userRepository
} } = container.cradle

const getUseCase = get({ userRepository })
const postUseCase = post({ userRepository })
const putUseCase = put({ userRepository })
const deleteUseCase = remove({ userRepository })

module.exports = {
  getUseCase,
  postUseCase,
  putUseCase,
  deleteUseCase
}
