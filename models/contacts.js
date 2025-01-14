const contact = require("./schema");

const listContacts = async () => {
  return contact.find();
}

const getContactById = async (contactId) => {
  return contact.findById({_id: contactId});
}

const removeContact = async (contactId) => {
  return contact.findOneAndDelete({_id: contactId});
}

const addContact = async (body) => {
  const {name, email, phone, favorite} = body;
  return contact.create(body);
}

const updateContact = async (contactId, body) => {
  const {favorite} = body;
  return contact.findByIdAndUpdate({_id: contactId}, body, {new: true});
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
