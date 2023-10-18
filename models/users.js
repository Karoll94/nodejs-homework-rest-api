const user = require ("./schemas/userSchema");

const getUserByEmail = async (email)=> {
    return user.findOne({email});
};


module.exports = {
    getUserByEmail
};