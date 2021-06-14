const express = require('express')
const router = express.Router()

const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../../controllers/controllers-contacts')
const { validation } = require('../../middlewares/validationMiddleware')

router
  .get('/', getAll)
  .get('/:contactId', getById)
  .post('/', validation, create)
  .delete('/:contactId', remove)
  .put('/:contactId', validation, update)

module.exports = router
