const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI
const userRepository = require('src/infra/repositories/user')
const { get, post, put, remove } = require('src/app/user')
const { compose } = require('ramda')

module.exports = () => {
  const router = Router()
  const { database, logger, auth, response: { Success, Fail } } = container.cradle

  const userModel = database.models.users
  const userUseCase = compose(
    userRepository
  )(userModel)

  const getUseCase = get({ userRepository: userUseCase })
  const postUseCase = post({ userRepository: userUseCase })
  const putUseCase = put({ userRepository: userUseCase })
  const deleteUseCase = remove({ userRepository: userUseCase })

/**
 * @swagger
 * definitions:
 *   user:
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       middleName:
 *         type: string
 *       email:
 *         type: string
 *       roleId:
 *         type: number
 *       isDeleted:
 *         type: number
 *       createdBy:
 *         type: string
 *         format: uuid
 */

  router.use(auth.authenticate())

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a list of users
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/user'
 *       401:
 *        $ref: '#/responses/Unauthorized'
 */
  router
    .get('/', (req, res) => {
      getUseCase
        .all(req, res)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     description: Create new user
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: User's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/user'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
  router
    .post('/', (req, res) => {
      postUseCase
        .create({ body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /users:
   *   put:
   *     tags:
   *       - Users
   *     description: Update User
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: User's ID to update
   *         type: string
   *       - name: body
   *         description: User's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/user'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/user'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .put('/:id', (req, res) => {
      putUseCase
        .update({ id: req.params.id, body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  /**
   * @swagger
   * /users:
   *   delete:
   *     tags:
   *       - Users
   *     description: Delete User
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: User's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/user'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   */
  router
    .delete('/:id', (req, res) => {
      deleteUseCase
        .remove({ id: req.params.id })
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
