const Faker = require('../../../support/fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('companies', Faker('companies'), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('companies', null, {})
  }
}
