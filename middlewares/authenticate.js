const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'secret';

exports.decodeToken = function (req, res, next) {
    console.log(req.headers);
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'NoHeadersError' });
    }

    const token = req.headers.authorization;
    const segment = token.split('.');

    if (segment.length !== 3) {
        return res.status(403).send({ message: 'InvalidToken' });
    } else {
        try {
            var payload = jwt.decode(token, secret);
            console.log(payload);
        } catch (error) {
            return res.status(403).send({ message: 'ErrorToken' });
        }
    }

    req.user = payload;
    next();
};