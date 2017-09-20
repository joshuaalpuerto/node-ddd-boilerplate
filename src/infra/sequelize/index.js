const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

module.exports = ({config, basePath}) => {
  const sequelize = new Sequelize(
    config.db.url,
    config.db
  )

  const db = {
    sequelize,
    Sequelize,
    models: {}
  }

  const dir = path.join(basePath, './models')
  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file)
    const model = sequelize.import(modelDir)
    db.models[model.name] = model
  })

  Object.keys(db.models).forEach(key => {
    if ('associate' in db.models[key]) {
      db.models[key].associate(db.models)
    }
  })

  return db
}
