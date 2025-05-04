const container = require('src/container')
const post = require('./post')

const { repository: { userRepository }, jwt } = container.resolve(['repository', 'jwt'])

const postUseCase = post({
  userRepository,
  webToken: jwt
})

module.exports = {
  postUseCase
}
