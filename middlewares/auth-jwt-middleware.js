const User = require('../models/user-models')
const jwtUtils = require('../utils/jwt-utils');

const authentication = (roles) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader ? authHeader.split(' ')[1] : false;
        // l'un ou l'autre
        //    const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(401)
        }
        let decodedToken;
        try{
            decodedToken = await jwtUtils.decode(token);
            
        }
        catch(error){
            return res.sendStatus(403);
        }
        if(roles){
            const userDB = await User.findById(decodedToken.id);
            const userDBRole = userDB.droit;
           if (!roles.includes(userDBRole)){
            return res.sendStatus(403);
           }

        }
        req.user = decodedToken;

        next();
    }
}

module.exports = authentication;