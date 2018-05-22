
const { expect, use } = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const updateUsecase = require('src/app/company/put')

use(sinonChai)

describe('App -> Company -> Put', () => {
  const body = {
    name: 'Test comp1',
    address: 'address1',
    contact: '11234456',
    tin: '123-3123-123134',
    sss: '23-12334444-9',
    philhealth: '1233-21321-3312',
    isDeleted: 0,
    createdBy: '1231'
  }
  let useCase
  let method

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        update: (data) => data
      }

      method = sinon.spy(MockRepository, 'update')
      useCase = updateUsecase({
        companyRepository: MockRepository
      })
    })

    it('should have called delete method of companyRepository', async () => {
      await useCase.update({ id: 1, body })
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

      useCase = updateUsecase({
        companyRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {
      let error
      try {
        await useCase.update({ id: 1, body })
      } catch (e) {
        error = e
      }
      expect(error).to.equal('Error')
    })
  })
})
