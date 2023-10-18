const mongoose = require("mongoose")
const Schema = mongoose.Schema;
// const bCrypt = require("bcryptjs");

const userSchema = new Schema({

        username: {
            type: String,
            required: [true, "Username required"],
            unique: true
        },
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        avatarURL: {
          type: String,
          required: true
      }
});


const user = mongoose.model("users", userSchema);

module.exports = user;