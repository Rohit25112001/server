const jwt = require('jsonwebtoken');

const asTemporary = 15 * 60; // 15 Minutes
const asPermanent = "7d";

const getPayload = (admin) =>{
    return{
        id:admin._id,
        username:admin.username,
        email:admin.email,
        mobile:admin.mobile 
        ? String(admin.mobile).replace(/.*(?=\d{2})/, '********') 
        : null,
        createdAt:admin.createdAt
    }
}

const accessToken = (user, key) => {
    return jwt.sign(getPayload(user), key, { expiresIn: asTemporary });
};

const refreshToken = (user, key) => {
    return jwt.sign(getPayload(user), key, { expiresIn: asPermanent });
};

const getCookies = (name=['at','rt'], type, key, user) => {
    if (type === 'at' && user) {
        return { [name[0]]:accessToken(user, key) };
    }

    if (type === 'rt' && user) {
        return { [name[1]]:refreshToken(user, key) };
    }

    if (type === 'all' && user) {
        return {[name[0]]: accessToken(user, key) , [name[1]]: refreshToken(user, key)}
    }
};

module.exports = getCookies;
