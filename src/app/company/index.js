const container = require('src/container')
const get = require('./get')
const post = require('./post')
const put = require('./put')
const remove = require('./delete')

const { repository: {
  companyRepository
} } = container.cradle

const getUseCase = get({ companyRepository })
const postUseCase = post({ companyRepository })
const putUseCase = put({ companyRepository })
const deleteUseCase = remove({ companyRepository })

module.exports = {
  getUseCase,
  postUseCase ,
  putUseCase,
  deleteUseCase
}
