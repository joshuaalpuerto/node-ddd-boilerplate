const Status = require('http-status')
const { Router } = require('express')
const { compose } = require('ramda')

const container = require('src/container') // we have to get the DI
const userRepository = require('src/infra/repositories/user')

const { post } = require('src/app/token')

module.exports = () => {
  const router = Router()
  const { database, logger, response: { Success, Fail }, jwt } = container.cradle

  const userModel = database.models.users
  const userUseCase = compose(
    userRepository
  )(userModel)

  const postUseCase = post({
    userRepository: userUseCase,
    webToken: jwt
  })

  /**
 * @swagger
 * definitions:
 *   auth:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

  /**
 * @swagger
 * /token:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Authenticate
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: User's credentials
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/auth'
 *     responses:
 *       200:
 *         description: Successfully login
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
  router
    .post('/', (req, res) => {
      postUseCase
        .validate({ body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  return router
}
