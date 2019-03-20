/* eslint-env mocha */

const {
  userRepository
} = app.resolve('repository')

describe('Routes: GET UsersEntity', () => {
  const BASE_URI = `/api/${config.version}`

  const signIn = app.resolve('jwt').signin()
  let token

  beforeEach((done) => {
    // we need to add user before we can request our token
    userRepository
      .destroy({ where: {} })
      .then(() =>
        userRepository.create({
          firstName: 'Test',
          lastName: 'Dev',
          middleName: 'Super Dev',
          email: 'testdev1@gmail.com',
          password: 'pass',
          roleId: 1,
          isDeleted: 0,
          createdBy: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b'
        })
      ).then(() =>
        userRepository.create({
          firstName: 'John',
          lastName: 'doe',
          middleName: 'JohnDoe',
          email: 'superjohndoe@gmail.com',
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

  describe('Should return users', () => {
    it('should return all users', (done) => {
      request.get(`${BASE_URI}/users`)
        .set('Authorization', `JWT ${token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data).to.have.length(2)
          done(err)
        })
    })

    it('should return unauthorized if no token', (done) => {
      request.get(`${BASE_URI}/users`)
        .expect(401)
        .end((err, res) => {
          expect(res.text).to.equals('Unauthorized')
          done(err)
        })
    })
  })
})
