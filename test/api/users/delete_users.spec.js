/* eslint-env mocha */
const { compose } = require('ramda')
const { models, repository } = require('test/factory')
const userRepository = require('src/infra/repositories/user')

describe('Routes: DELETE Users', () => {
  const BASE_URI = `/api/${config.version}`

  const UserUseCase = compose(
    repository(userRepository),
    models
  )('users')

  const signIn = app.resolve('jwt').signin()
  let token
  let userId

  beforeEach((done) => {
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
        userId = user.id
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

  describe('Should DELETE users', () => {
    it('should delete user', (done) => {
      request.delete(`${BASE_URI}/users/${userId}`)
      .set('Authorization', `JWT ${token}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.eql(true)

        done(err)
      })
    })

    it('should return unauthorized if no token', (done) => {
      request.delete(`${BASE_URI}/users/${userId}`)
      .expect(401)
      .end((err, res) => {
        expect(res.text).to.equals('Unauthorized')
        done(err)
      })
    })
  })
})
