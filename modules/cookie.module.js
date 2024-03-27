const jwt = require('jsonwebtoken');

const asTemporary = 15 * 60; // 15 Minutes
const asPermanent = "7d";

const getPayload = (user) => {
    return {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        mobile: String(user.mobile).replace(/\d(?=1\d{2})/g, '*'),
        createdAt: user.createdAt,
    };
};

const accessToken = (user) => {
    return jwt.sign(getPayload(user), process.env.SECRET_KEY, { expiresIn: asTemporary });
};

const refreshToken = (user) => {
    return jwt.sign(getPayload(user), process.env.SECRET_KEY, { expiresIn: asPermanent });
};

const getCookies = (type, user) => {
    if (type === 'at' && user) {
        return { at:accessToken(user) };
    }

    if (type === 'rt' && user) {
        return { rt:refreshToken(user) };
    }

    if (type === 'all' && user) {
        return {at: accessToken(user) , rt: refreshToken(user)}
    }
};

module.exports = getCookies;
