const path = require('path')
const dotEnvPath = path.resolve('.env')

/**
 * since mocha don't see enviroment variables we have to use dotenv
 */
require('dotenv').config({ path: dotEnvPath })

module.exports = {
  development: {
    'url': process.env.DATABASE_URL,
    'dialect': 'postgres',
    'define': {
      'underscored': true
    }
  },
  test: {
    'url': process.env.DATABASE_URL_TEST,
    'dialect': 'postgres',
    'define': {
      'underscored': true
    },
    logging: false // remove logs
  },
  staging: {
    'url': process.env.DATABASE_URL_STAGING,
    'dialect': 'postgres',
    'define': {
      'underscored': false
    },
    'ssl': true,
    'dialectOptions': {
      'ssl': {
        'require': true
      }
    }
  },
  production: {
    'url': process.env.DATABASE_URL_PRODUCTION,
    'dialect': 'postgres',
    'define': {
      'underscored': false
    },
    'ssl': true,
    'dialectOptions': {
      'ssl': {
        'require': true
      }
    }
  }
}
