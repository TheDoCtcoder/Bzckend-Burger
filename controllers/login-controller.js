const User = require('../models/user-models');
const jwtUtils = require('../utils/jwt-Utils');
const argon2 = require('argon2');

const loginController = {
    login: async (req,res) => {
        const {email, password} = req.body;
        // console.log(mail);
        const filter = {email}
        const user = await User.findOne(filter);
        if (!user) {
            return res.status(401).json({erreur : 'utilisateur non enregistré'})
        }
        const isPasswordValid = await argon2.verify(user.password, password)
        if(!isPasswordValid){
            return res.status(401).json({error : 'Mauvais mot de passe'})
        }
        const token = await jwtUtils.generate(user);
        return res.json({token});
    },
    register: async (req, res) => {
        const { email, prenom, nom, tel,password, adresse  } = req.body;
        const hashedPassword = await argon2.hash(password);


        const userToInsert = User({
            email,
            prenom,
            nom,
            tel,
            password : hashedPassword,
            adresse,

        });

        await userToInsert.save();
        const token = await jwtUtils.generate(userToInsert);
        res.status(200).json({token});
    }
}

module.exports = loginController;