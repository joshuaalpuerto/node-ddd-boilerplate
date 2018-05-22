
const { expect } = require('chai')
const postUsecase = require('src/app/user/post')

describe('App -> User -> Post', () => {
  let useCase

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        create: (data) => data
      }

      useCase = postUsecase({
        userRepository: MockRepository
      })
    })

    it('should create the records and list the data and append the default password', async () => {
      const body = {
        firstName: 'test',
        lastName: 'dev',
        middleName: 'test',
        email: 'test@gmail.com',
        roleId: 1,
        isDeleted: 0,
        createdBy: '123'
      }
      const lists = await useCase.create({ body })
      expect(lists.firstName).to.equal(body.firstName)
      expect(lists.lastName).to.equal(body.lastName)
      expect(lists.middleName).to.equal(body.middleName)
    })
  })

  describe('Fail path', () => {
    const body = {
      firstName: 'test',
      lastName: 'dev',
      middleName: 'test',
      email: 'test@gmail.com',
      roleId: 1,
      isDeleted: 0,
      createdBy: '123'
    }

    beforeEach(() => {
      const MockRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        create: () => Promise.reject('Error')
      }

      useCase = postUsecase({
        userRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {
      let error
      try {
        await useCase.create({ body })
      } catch (e) {
        error = e.message
      }
      expect(error).to.equal('Error')
    })
  })
})
