const container = require('src/container')
const post = require('./post')

const { repository: {
  userRepository
}, jwt } = container.cradle

const postUseCase = post({
  userRepository,
  webToken: jwt
})

module.exports = {
  postUseCase
}
