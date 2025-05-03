
const { getUseCase, postUseCase, putUseCase, deleteUseCase } = require('src/app/company')

module.exports = () => {
  return {
    getUseCase,
    postUseCase,
    putUseCase,
    deleteUseCase
  }
}
