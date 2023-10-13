const { rules } = require("eslint-config-prettier");
const modelcontact = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
    const owner = req.user._id;
    
    try {
      const results = await modelcontact.listContacts({owner});
      res.json({
        status: "success",
        code: 200,
        data: {
          contacts: results,
        },
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  };

//   getAllContacts();

const ContactById = async (req, res, next)=> {
  const contactId = req.params.contactId;
  try {
    const result = await modelcontact.getContactById(contactId);
    if (result) {
      res.json({
        status: 'Sucess',
        code:200,
        data:{
          contact: result
        },
      });
    }else {
      res.json({
        status: 'Error',
        code: 404,
        message: `Contact not found by id ${contactId}`,
        data: 'Not found'
      });
    };
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const deleteContact = async (req,res,next) =>{
  const contactId = req.params.contactId;
  try {
    const result = await modelcontact.removeContact(contactId);
    if(result){
      res.json({
        status: 'Success',
        code: 200,
        message: 'Deleted contact'
      })
    }else {
      res.json({
        status: 'Error',
        code: 404,
        message: `Contact not found by id ${contactId}`,
        data: 'Not found'
      })
    }
  } catch (e) {
    console.error(e);
    next(e);
  };
};

const createContact = async (req,res,next)=>{
  const {name, email, phone, favorite} = req.body;
  const owner = req.user._id;
  try {
    const result = await modelcontact.addContact({
      name,
      email,
      phone,
      favorite,
      owner
    });
    res.json({
      status: 'Success',
      code:201,
      data: {
        contact: result
      },
    });
  } catch (error) {
    console.error(e);
    next(e);
  }
}

const modifyContact = async (req,res,next)=>{
  const contactId = req.params.contactId;
  const {name, email, phone} = req.body;
  try {
    const result = await modelcontact.updateContact(contactId,{
      name,
      email,
      phone
    });
    if (result){
      res.json({
        status: 'Success',
        code: 200,
        data: {
          contact: result
        }
      });
    }else {
      res.json({
        status: 'Error',
        code: 404,
        message: `Contact not found by id ${contactId}`,
        data: 'Not found'
      });
    };
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateFavorite = async (req, res, next)=>{
  const contactId = req.params.contactId;
  const { favorite } = req.body;
  try {
    if (favorite === undefined) {
      res.json({
        status: "Error",
        code: 400,
        message: "missing field favorite",
        data: "Not found",
      });
      return;
    }
    const result = await modelcontact.updateContact(contactId, {
      favorite, 
    },{new: true});
    if (result) { 
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        }, 
      });
    } else {
      res.json({
        status: "error",
        code: 404,
        message: `Contact not found by id ${contactId}`,
        data: "Not found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};


  module.exports = {
    getAllContacts,
    ContactById,
    deleteContact,
    createContact,
    modifyContact,
    updateFavorite
  };