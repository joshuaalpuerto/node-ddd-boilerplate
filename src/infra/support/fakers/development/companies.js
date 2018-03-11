const faker = require('faker')
const { range, map, compose } = require('ramda')

module.exports = () => {
  const numberCompanies = range(0, 5)
  const populateCompany = compose(
    map(() => ({
      id: faker.random.uuid(),
      name: faker.company.companyName(),
      contact: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      tin: faker.finance.iban(),
      sss: faker.finance.iban(),
      philhealth: faker.finance.iban(),
      isDeleted: 0,
      // TODO: we need to make sure to match company to the user
      createdBy: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
      createdAt: new Date(),
      updatedAt: new Date()
    }))
  )

  return populateCompany(numberCompanies)
}
