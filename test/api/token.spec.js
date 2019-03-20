/* eslint-env mocha */
const {
  userRepository
} = app.resolve('repository')

describe('Routes: Login', () => {
  const BASE_URI = `/api/${config.version}`

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
      ).then(() => done())
  })

  describe('POST Token', () => {
    it('should retrieved token', done => {
      request.post(`${BASE_URI}/token`)
        .send({
          email: 'testdev1@gmail.com',
          password: 'pass'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.include.keys('token')
          done(err)
        })
    })

    it('should throw error if email not existing', done => {
      request.post(`${BASE_URI}/token`)
        .send({
          email: 'testdev1234@gmail.com',
          password: 'pass'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.include.keys('error')
          done(err)
        })
    })

    it('should throw error if password incorrect', done => {
      request.post(`${BASE_URI}/token`)
        .send({
          email: 'testdev1@gmail.com',
          password: 'pass123'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.include.keys('error')
          expect(res.body.error).to.equal('Invalid Credentials')
          done(err)
        })
    })
  })
})
