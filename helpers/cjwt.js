var jwt = require('jwt-simple');
var moment = require('moment');
var secure = 'secure';

exports.createToken = function(cliente){
    var payload = {
        sub: cliente._id,
        nombres: cliente.nombres,
        apellidos: cliente.apellidos,
        email: cliente.email,
        genero: cliente.genero,
        iat: moment().unix(),
        exp: moment().add(7, 'day').unix()
    }

    return jwt.encode(payload, secure);
};