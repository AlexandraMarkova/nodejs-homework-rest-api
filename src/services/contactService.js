/* eslint-disable no-useless-catch */
const mongoose = require('mongoose')
const { Contact } = require('../schemas/contact')

const listContacts = async (userId) => {
  try {
    const data = await Contact.find({ owner: userId })
    return data
  } catch (error) {
    return error
  }
}

const getContactById = async (contactId, userId) => {
  try {
    if (mongoose.isValidObjectId(contactId)) {
      const contact = await Contact.findById(contactId, userId)
      return contact
    }
  } catch (error) {
    throw error
  }
}

const removeContact = async (contactId) => {
  try {
    if (mongoose.isValidObjectId(contactId)) {
      const contact = await Contact.findByIdAndRemove(contactId)
      return contact
    }
  } catch (error) {
    throw error
  }
}

const addContact = async (body) => {
  try {
    const contact = new Contact({ ...body })
    await contact.save()
    return contact
  } catch (error) {
    throw error
  }
}

const updateContact = async (contactId, body) => {
  try {
    if (mongoose.isValidObjectId(contactId)) {
      const contact = await Contact.findByIdAndUpdate(
        contactId,
        {
          $set: { ...body },
        },
        { new: true },
      )
      return contact
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}