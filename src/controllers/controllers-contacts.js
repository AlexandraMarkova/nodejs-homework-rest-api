const mongoose = require('mongoose')
const { HttpCode } = require('../helpers/constants')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../model/index')

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contacts },
    })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId

    if (mongoose.isValidObjectId(id)) {
      const contactById = await getContactById(id)
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { contactById },
      })
    } else {
      res.status(HttpCode.NOT_FOUND).json({
        status: HttpCode.NOT_FOUND,
        massage: 'Not Found Contact',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    if (name && email && phone) {
      const contact = await addContact(req.body)
      res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: { contact },
      })
    } else {
      res.status(HttpCode.BAD_REQUEST).json({
        status: HttpCode.BAD_REQUEST,
        massage: 'missing required name field',
      })
    }
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)
    const updatedContact = await getContactById(req.params.contactId)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { updatedContact },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        massage: 'missing fields',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.contactId
    if (mongoose.isValidObjectId(id)) {
      // eslint-disable-next-line no-unused-vars
      const contactById = await removeContact(id)
      return res.status(HttpCode.OK).json({
        status: 'success',
        massage: 'contact deleted',
        code: HttpCode.OK,
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        massage: 'Not Found Contact',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
