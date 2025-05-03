
const { getUseCase, postUseCase, putUseCase, deleteUseCase } = require('src/app/user')

module.exports = () => {
  return {
    getUseCase,
    postUseCase,
    putUseCase,
    deleteUseCase
  }
}
