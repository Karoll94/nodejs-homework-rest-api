const userModel = require("../models/users");
require("dotenv").config();
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

const login = async (req, res, next)=>{
    const {email, password} = req.body;
    const user = await userModel.getUserByEmail(email);

if ( !user || !user.password) {
    return res.status(400).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong",
        data: "Bad request"
    });
}
const paylod = {
    id: user.id,
    username: user.username,
};

const token = jwt.sign(paylod, secret, {expiresIn: "1h"} );
res.json({
    status: "Sucess",
    code: 200,
    data: {
        token,
    }
});
};

module.exports = {
    login};


