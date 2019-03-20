const Status = require('http-status')
const { Router } = require('express')

module.exports = ({
  getUseCase,
  postUseCase,
  putUseCase,
  deleteUseCase,
  logger,
  auth,
  response: { Success, Fail }
}) => {
  const router = Router()

  /**
 * @swagger
 * definitions:
 *   company:
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       name:
 *         type: string
 *       address:
 *         type: string
 *       contact:
 *         type: string
 *       tin:
 *         type: string
 *       sss:
 *         type: string
 *       philhealth:
 *         type: string
 *       isDeleted:
 *         type: number
 *       createdBy:
 *         type: string
 *         format: uuid
 */

  router.use(auth.authenticate())

  /**
* @swagger
* /companies:
*   get:
*     tags:
*       - Companies
*     description: Returns a list of companies
*     security:
*       - JWT: []
*     responses:
*       200:
*         description: An array of companies
*         schema:
*           type: array
*           items:
*             $ref: '#/definitions/company'
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
* /companies:
*   post:
*     tags:
*       - Companies
*     description: Create new company
*     security:
*       - JWT: []
*     produces:
*       - application/json
*     parameters:
*       - name: body
*         description: Company's Entity
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/company'
*     responses:
*       200:
*         description: Successfully Created
*         schema:
*           $ref: '#/definitions/company'
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
 * /companies:
 *   put:
 *     tags:
 *       - Companies
 *     description: Update Company
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Company's ID to update
 *         type: string
 *       - name: body
 *         description: Company's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/company'
 *     responses:
 *       200:
 *         description: Successfully Updated
 *         schema:
 *           $ref: '#/definitions/company'
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
 * /companies:
 *   delete:
 *     tags:
 *       - Companies
 *     description: Delete Company
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Company's ID to delete
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully Deleted
 *         schema:
 *           $ref: '#/definitions/company'
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
