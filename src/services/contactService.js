/* eslint-disable no-useless-catch */
const mongoose = require('mongoose')
const { Contact } = require('../schemas/contact')

const listContacts = async (userId) => {
  try {
    const data = await Contact.find({ owner: userId })
    // console.log(data)
    return data
  } catch (error) {
    return error
  }
}

const getContactById = async (id, userId) => {
  try {
    if (mongoose.isValidObjectId(id)) {
      const contact = await Contact.findOne({ _id: id, owner: userId })
      console.log(contact)
      return contact
    }
  } catch (error) {
    throw error
  }
}

const removeContact = async (id, userId) => {
  try {
    if (mongoose.isValidObjectId(id)) {
      const contact = await Contact.findOneAndRemove({
        _id: id,
        owner: userId,
      })
      return contact
    }
  } catch (error) {
    throw error
  }
}

const addContact = async (body, userId) => {
  try {
    const contact = new Contact({ ...body, owner: userId })
    await contact.save()
    return contact
  } catch (error) {
    throw error
  }
}

const updateContact = async (id, body, userId) => {
  try {
    if (mongoose.isValidObjectId(id)) {
      const contact = await Contact.findOneAndUpdate(
        { _id: id, owner: userId },
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
