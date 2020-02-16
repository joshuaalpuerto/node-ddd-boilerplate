const { expect, use } = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const app = require('src/app/')

use(sinonChai)

describe('App -> index', () => {
  let dbAuthenticate
  let setupHealthCheck
  let serverStart

  const mockDatabase = {
    authenticate: () => Promise.resolve(true)
  }
  const mockServer = {
    setupHealthCheck: () => Promise.resolve(true),
    start: () => Promise.resolve(true)
  }

  const instance = app({
    database: mockDatabase,
    server: mockServer
  })

  beforeEach(() => {
    dbAuthenticate = sinon.spy(mockDatabase, 'authenticate')
    setupHealthCheck = sinon.spy(mockServer, 'setupHealthCheck')
    serverStart = sinon.spy(mockServer, 'start')
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('Success path', () => {
    it('server should start sucessfully', async () => {
      await instance.start()
      // eslint-disable-next-line
      expect(dbAuthenticate).to.have.been.called
      // eslint-disable-next-line
      expect(setupHealthCheck).to.have.been.called
      // eslint-disable-next-line
      expect(serverStart).to.have.been.called
    })
  })
})
