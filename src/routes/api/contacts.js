const express = require('express')
const router = express.Router()

const {
  getAll,
  getById,
  create,
  update,
  remove,
  patchPost,
} = require('../../controllers/controllers-contacts')
const {
  validation,
  patchValidation,
} = require('../../middlewares/validationMiddleware')

router
  .get('/', getAll)
  .get('/:contactId', getById)
  .post('/', validation, create)
  .delete('/:contactId', remove)
  .put('/:contactId', validation, update)
  .patch('/:contactId/favorite', patchValidation, patchPost)

module.exports = router
