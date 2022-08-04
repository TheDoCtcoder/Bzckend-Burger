const jwt = require('jsonwebtoken');
const { JWT_AUDIENCE,JWT_ISSUER,JWT_SECRET } = process.env;

const jwtUtils = {
    generate : ({id, email, droit}) => {
        return new Promise ((resolve, reject) =>  {
            // jwt.sign('paylod','secret', 'option/header', (error, token) => {
            
            const payload = { id, email, droit};
            const options = {
                algorithm : 'HS512',
                expiresIn : '12h',
                audience : JWT_AUDIENCE,
                issuer : JWT_ISSUER
            }

            jwt.sign(payload, JWT_SECRET, options, (error, token) => {
                if(error){
                   return reject(error);
                }
                resolve(token);
            })
        })
    },
    decode : (token) => {
        if(!token){
            return Promise.reject(new Error('no Token'))
        }
        return new Promise((resolve, reject) => {
            const options = {
                audience : JWT_AUDIENCE,
                issuer : JWT_ISSUER
            }
            // jwt.verify('token','secret','option/header', (error, payload) => {
            jwt.verify(token,JWT_SECRET ,options, (error, payload) => {
                if(error) {
                    return reject(error);
                }
                resolve(payload);
            })
        })
    }

}

module.exports = jwtUtils;