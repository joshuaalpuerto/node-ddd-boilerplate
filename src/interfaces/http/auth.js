const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const { compose } = require('ramda')

const userRepository = require('src/infra/repositories/user')

/**
 * middleware to check the if auth vaid
 */

module.exports = ({ config, database }) => {
  const params = {
    secretOrKey: config.authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
  }

  const strategy = new Strategy(params, (payload, done) => {
    const userModel = database.models.users
    const userUseCase = compose(
      userRepository
    )(userModel)

    userUseCase.findById(payload.id)
      .then((user) => {
        done(null, user)
      })
      .catch((error) => done(error, null))
  })

  passport.use(strategy)

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: () => {
      return passport.authenticate('jwt')
    }
  }
}
