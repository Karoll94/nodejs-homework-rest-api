const userModel = require ("../models/users");
const userSchema = require ("../models/schemas/userSchema");
require("dotenv").config();
const gravatar = require("gravatar");

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
      const newUser = new userSchema({ username, password, email, subscription, token, avatarURL});
      await newUser.save();
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          message: "Registration successful",
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