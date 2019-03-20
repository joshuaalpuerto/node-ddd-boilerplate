
const container = require('src/container') // we have to get the DI
const { get, post, put, remove } = require('src/app/company')

module.exports = () => {
  const { repository: {
    companyRepository
  } } = container.cradle

  const getUseCase = get({ companyRepository })
  const postUseCase = post({ companyRepository })
  const putUseCase = put({ companyRepository })
  const deleteUseCase = remove({ companyRepository })

  return {
    getUseCase,
    postUseCase,
    putUseCase,
    deleteUseCase
  }
}
