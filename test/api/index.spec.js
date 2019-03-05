/* eslint-env mocha */
describe('Routes: Index', () => {
  const BASE_URI = `/api/${config.version}`

  describe('GET /', () => {
    it('returns the API status', done => {
      request.get(`${BASE_URI}/`)
        .expect(200)
        .end((err, res) => {
          const expected = { status: 'API working' }
          expect(res.body).to.eql(expected)
          done(err)
        })
    })
  })
})
