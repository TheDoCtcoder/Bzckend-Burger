const User = require('../models/user-models');
const jwtUtils = require('../utils/jwt-utils');

const UserController = {

    Create: async (req, res) => {
        const userToAdd = User(req.body);
        await userToAdd.save();
        res.status(200).json(userToAdd)
    },
    GetAll: async (req, res) => {
        const userToAff = await User.find();
        res.status(200).json(userToAff);
    },
    GetByID: async (req, res) => {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" })
        }

        res.status(200).json(user);
    },
    Update: async (req, res) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader ? authHeader.split(' ')[1] : false;
        let decodedToken;
        try {
            decodedToken = await jwtUtils.decode(token);
        }
        catch (error) {
            return res.sendStatus(403);
        }
        console.log(decodedToken.id);
        console.log(req.params.id);
        if (decodedToken.id != req.params.id && decodedToken.droit != "Admin") {
            return res.status(404).json({ message: "Vous ne pouvez pas modifié un autre utilisateur" });
        } 
        if (decodedToken.droit !="Admin") {
              const { email, prenom, nom,tel, adresse } = req.body
            const userUpdated = await User.findByIdAndUpdate(req.params.id, {
                email,
                prenom,
                nom,
                tel,
                adresse

            }, { returnDocument: 'after' });       
            if (!userUpdated) {
                return res.status(404).json({ message: "utilisateur non trouvé, impossible de modifié!!!" });
            }
            res.status(201).json({ message: "utilisateur modifiée" });


    }
    else {
        const { email, prenom, nom,droit, tel, adresse } = req.body
            const userUpdated = await User.findByIdAndUpdate(req.params.id, {
                email,
                prenom,
                nom,
                droit,
                tel,
                adresse

            }, { returnDocument: 'after' });               
            if (!userUpdated) {
                return res.status(404).json({ message: "utilisateur non trouvé, impossible de modifié!!!" });
            }
            res.status(201).json({ message: "utilisateur modifiée" });
    }
},
    delete: async (req, res) => {
        const id = req.params.id;
        const userToDelete = await User.findByIdAndDelete(id);
        if (!userToDelete) {
            return res.status(404).json({ message: "utilisateur non trouvé, impossible d'effacer !!!" });
        }
        //  res.sendStatus(204);
        res.status(201).json({ message: "utilisateur effacé" });
    }

}


module.exports = UserController;