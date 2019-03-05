/**
 * We need to find a way to user the repositories for our test that it we will have minimum impact once we change our ORM or our DATABASE
 */
const { curry } = require('ramda')

// we will call each repo on thier test  cases  here we will just compose the items.

const models = (name) => app.resolve('database').models[name]

const repository = curry((repo, model) => {
  return repo(model)
})

module.exports = {
  models,
  repository
}
