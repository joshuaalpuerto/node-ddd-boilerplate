/* eslint-env mocha */
const { compose } = require('ramda')
const { models, repository } = require('test/factory')
const userRepository = require('src/infra/repositories/user')
const companyRepository = require('src/infra/repositories/company')

describe('Routes: POST Users', () => {
  const BASE_URI = `/api/${config.version}`

  const UserUseCase = compose(
    repository(userRepository),
    models
  )('users')

  const CompanyUseCase = compose(
    repository(companyRepository),
    models
  )('companies')

  const signIn = app.resolve('jwt').signin()
  let token

  beforeEach((done) => {
    // we need to add user before we can request our token
     // we need to add user before we can request our token
    UserUseCase
      .destroy({where: {}})
      .then(() =>
        UserUseCase.create({
          firstName: 'Test',
          lastName: 'Dev',
          middleName: 'Super Dev',
          email: 'testdev1@gmail.com',
          password: 'pass',
          roleId: 1,
          isDeleted: 0,
          createdBy: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b'
        })
      ).then((user) => {
        token = signIn({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          email: user.email
        })
        done()
      })
  })

  describe('Should post companies', () => {
    beforeEach((done) => {
      CompanyUseCase
        .destroy({where: {}})
        .then(() => done())
    })

    it('should return create company', (done) => {
      request.post(`${BASE_URI}/companies`)
      .set('Authorization', `JWT ${token}`)
      .send({
        'name': 'My Company Test',
        'address': '1705 German Hollow',
        'contact': '658.412.5787',
        'tin': 'KZ460888270914935SZV',
        'sss': 'TR6529864874412796R3T19934',
        'philhealth': 'IL455238030594064057191',
        'isDeleted': 0,
        'createdBy': '4efda34e-5e05-483a-8e3f-ac31d20dc2a8'
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.name).to.eql('My Company Test')
        expect(res.body.data.address).to.eql('1705 German Hollow')
        expect(res.body.data.contact).to.eql('658.412.5787')
        done(err)
      })
    })

    it('should validate companies object is not complete', (done) => {
      request.post(`${BASE_URI}/companies`)
      .set('Authorization', `JWT ${token}`)
      .send({
        'name': 'My Company Test',
        'address': '1705 German Hollow',
        'contact': '658.412.5787'
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.include.keys('error')
        done(err)
      })
    })

    it('should return unauthorized if no token', (done) => {
      request.post(`${BASE_URI}/companies`)
      .expect(401)
      .end((err, res) => {
        expect(res.text).to.equals('Unauthorized')
        done(err)
      })
    })
  })
})
