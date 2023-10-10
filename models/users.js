const user = require ("./schemas/userSchema");

const getUserByEmail = async (email)=> {
    return user.findOne({email});
};

const allUsers = async () => {
    return user.find();
}

// console.log(allUsers());

module.exports = {
    getUserByEmail,
    allUsers
};