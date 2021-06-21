/* eslint-disable no-useless-catch */

const { Contact } = require('../db/contactModel')

const listContacts = async () => {
  try {
    const data = await Contact.find({})
    return data
  } catch (error) {
    return error
  }
}
const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId)
    return contact
  } catch (error) {
    throw error
  }
}

const removeContact = async (contactId) => {
  try {
    const contact = Contact.findByIdAndRemove(contactId)
    return contact
  } catch (error) {
    throw error
  }
}

const addContact = async (body) => {
  const { name, email, phone } = body

  try {
    const contact = new Contact({ name, email, phone })
    await contact.save()
    return contact
  } catch (error) {
    throw error
  }
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone } })
    return contact
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
