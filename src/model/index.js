/* eslint-disable no-useless-catch */
const fs = require('fs').promises
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const dataParse = JSON.parse(data)
    return dataParse
  } catch (error) {
    return error
  }
}
const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contactsList = JSON.parse(data)
    const contactById = contactsList.find(
      (contact) => contact.id === Number(contactId),
    )
    return contactById
  } catch (error) {
    throw error
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== Number(contactId),
    )
    return filteredContacts
  } catch (error) {
    throw error
  }
}

const addContact = async (body) => {
  const id = uuidv4()
  const todo = {
    id: id,
    name: body.name,
    email: body.email,
    phone: body.phone,
  }

  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const dataParse = JSON.parse(data)

    await fs.writeFile(
      './contacts.json',
      JSON.stringify([todo, ...dataParse], null, 2),
    )
    return todo
  } catch (error) {
    throw error
  }
}

const updateContact = async (contactId, body) => {
  try {
    const initialContact = await getContactById(contactId)
    const contactList = await listContacts()
    const updatedContact = { ...initialContact, ...body }
    const updateContactList = contactList.map((contact) =>
      contact.id === Number(contactId) ? updatedContact : contact,
    )
    await fs.writeFile(
      './contacts.json',
      JSON.stringify(updateContactList, null, 2),
    )
    return updatedContact
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
