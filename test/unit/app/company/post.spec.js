
const { expect } = require('chai')
const postUsecase = require('src/app/company/post')

describe('App -> Company -> Post', () => {
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

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        create: (data) => data
      }

      useCase = postUsecase({
        companyRepository: MockRepository
      })
    })

    it('should create the record', async () => {
      const lists = await useCase.create({ body })
      expect(lists.name).to.equal(body.name)
      expect(lists.address).to.equal(body.address)
      expect(lists.contact).to.equal(body.contact)
    })
  })

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        create: () => Promise.reject('Error')
      }

      useCase = postUsecase({
        companyRepository: MockRepository
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
