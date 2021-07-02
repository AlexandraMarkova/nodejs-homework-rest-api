const express = require('express')
const router = express.Router()

const {
  getAll,
  getById,
  create,
  update,
  remove,
  patchPost,
} = require('../../controllers/controllersContacts')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const {
  validation,
  patchValidation,
} = require('../../middlewares/validationMiddleware')

router.use(authMiddleware)

router
  .get('/', getAll)
  .get('/:contactId', getById)
  .post('/', validation, create)
  .delete('/:contactId', remove)
  .put('/:contactId', validation, update)
  .patch('/:contactId/favorite', patchValidation, patchPost)

module.exports = router
