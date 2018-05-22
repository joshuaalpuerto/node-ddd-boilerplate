
const { expect, use } = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const deleteUsecase = require('src/app/company/delete')

use(sinonChai)

describe('App -> Company -> Delete', () => {
  let useCase
  let method

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        update: () => {}
      }

      method = sinon.spy(MockRepository, 'update')
      useCase = deleteUsecase({
        companyRepository: MockRepository
      })
    })

    it('should have called delete method of companyRepository', async () => {
      await useCase.remove({ id: 1 })
      // eslint-disable-next-line
      expect(method).to.have.been.called
    })
  })

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        update: () => Promise.reject('Error')
      }

      useCase = deleteUsecase({
        companyRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {
      let error
      try {
        await useCase.remove({ id: 1 })
      } catch (e) {
        error = e.message
      }
      expect(error).to.equal('Error')
    })
  })
})
