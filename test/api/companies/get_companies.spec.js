/* eslint-env mocha */
const {
  userRepository,
  companyRepository
} = app.resolve('repository')

describe('Routes: GET Companies', () => {
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

  describe('Should return companies', () => {
    beforeEach((done) => {
      companyRepository
        .destroy({ where: {} })
        .then(() =>
          companyRepository.create({
            'name': 'My Company Test',
            'address': '1705 German Hollow',
            'contact': '658.412.5787',
            'tin': 'KZ460888270914935SZV',
            'sss': 'TR6529864874412796R3T19934',
            'philhealth': 'IL455238030594064057191',
            'isDeleted': 0,
            'createdBy': '4efda34e-5e05-483a-8e3f-ac31d20dc2a8'
          })
        )
        .then(() => done())
    })

    it('should return all companies', (done) => {
      request.get(`${BASE_URI}/companies`)
        .set('Authorization', `JWT ${token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data).to.have.length(1)
          done(err)
        })
    })

    it('should return unauthorized if no token', (done) => {
      request.get(`${BASE_URI}/companies`)
        .expect(401)
        .end((err, res) => {
          expect(res.text).to.equals('Unauthorized')
          done(err)
        })
    })
  })
})
