const jwt = require('jwt-simple');
const moment = require('moment');
const secretKey = 'secure';

exports.createToken = function (user) {
    const payload = {
        sub: user._id,
        names: user.firstName,
        lastNames: user.lastName,
        email: user.email,
        gender: user.gender,
        iat: moment().unix(),
        exp: moment().add(7, 'day').unix()
    }

    return jwt.encode(payload, secretKey);
};