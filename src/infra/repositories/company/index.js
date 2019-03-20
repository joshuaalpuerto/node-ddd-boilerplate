const { toEntity } = require('./transform')

module.exports = ({ model }) => {
  const getAll = (...args) =>
    model.findAll(...args).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
    )

  const create = (...args) =>
    model.create(...args).then(({ dataValues }) => toEntity(dataValues))

  const update = (...args) =>
    model.update(...args)

  const destroy = (...args) =>
    model.destroy(...args)

  return {
    getAll,
    create,
    update,
    destroy
  }
}
