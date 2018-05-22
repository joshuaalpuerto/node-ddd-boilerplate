
const { expect, use } = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const deleteUsecase = require('src/app/user/delete')

use(sinonChai)

describe('App -> User -> Delete', () => {
  let useCase
  let method

  describe('Success path', () => {
    beforeEach(() => {
      const MockUserRepository = {
        update: () => {}
      }

      method = sinon.spy(MockUserRepository, 'update')
      useCase = deleteUsecase({
        userRepository: MockUserRepository
      })
    })

    it('should have called delete method of userRepository', async () => {
      await useCase.remove({ id: 1 })
      // eslint-disable-next-line
      expect(method).to.have.been.called
    })
  })

  describe('Fail path', () => {
    beforeEach(() => {
      const MockUserRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        update: () => Promise.reject('Error')
      }

      useCase = deleteUsecase({
        userRepository: MockUserRepository
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
