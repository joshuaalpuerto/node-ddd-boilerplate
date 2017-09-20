/**
 * We need to find a way to user the repositories for our test that it we will have minimum impact once we change our ORM or our DATABASE
 */
const { compose } = require('ramda')

 // we will call each repo on thier test  cases  here we will just compose the items.

const repository = (model) => {
  const entity = app.resolve('database').models[model]
  return (repo) => compose(repo)(entity)
}

module.exports = {
  repository
}
