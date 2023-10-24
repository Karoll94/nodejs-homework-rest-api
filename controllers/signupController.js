const userModel = require ("../models/users");
const userSchema = require ("../models/schemas/userSchema");
require("dotenv").config();
const gravatar = require("gravatar");
var uuid = require("uuid");
const emailService = require("../models/email");
const secret = process.env.SECRET;

  const signup = async (req, res, next) => {
    const { username, email, password, subscription, token, } = req.body;
    const user = await userModel.getUserByEmail(email);
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    try {
      const avatarURL =  gravatar.url(email);
      const verificationToken = uuid.v1();
      const newUser = new userSchema({ username, password, email, subscription, token, avatarURL, verificationToken});
      await newUser.save();
      
      emailService.sendEmail(email, verificationToken);
      res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          username,
          email,
          avatarURL,
          verificationToken,
        },
      },
    });

    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  

module.exports ={
    signup
}