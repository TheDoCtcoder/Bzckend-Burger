const { populate } = require('../models/commande-models');
const commande = require('../models/commande-models');
const CommandeController = {

    Create: async (req, res) => {
        const commandeToAdd = commande(req.body);
        await commandeToAdd.save();
        res.status(200).json(commandeToAdd)
    },
    GetAll: async (req, res) => {
        const commandeToAff = await commande.find()
            .populate({
                path: 'burger.burgerID',
                populate : {
                    path : 'allergeneID',
                    select: { name: 1, _id: 1 }
                  },
                select: { name: 1, allergeneID:1, prix: 1, _id: 0 }
            })
            .populate({
                path: 'burger.supplementID',
                select: { name: 1, prix: 1, _id: 0 }
            })
            .populate({
                path: 'userID',
                select: { email: 1, adresse: 1, _id: 1 }
            })
        res.status(200).json(commandeToAff);
    },
    GetByID : async (req,res) => {
        const id = req.params.id;
        const commandeById = await commande.findById(id);
        if(!commandeById){
            return res.status(404).json({message : "Commande non trouvée"})
        }

        res.status(200).json(commandeById);
    },
    Update: async (req, res) => {
        const id =  req.params.id;
        const {burger, status, remarque} = req.body
       const burgerUpdated = await commande.findByIdAndUpdate(id, {
            burger,
            status,
            remarque,
    
        }, { returnDocument : 'after'});
        if(!burgerUpdated){
            return res.status(404).json({Message : "Commande non trouvée"});
        }
        res.status(201).json({message : "Commande modifiée"});
    
    },
    delete : async (req, res) => {
        const id = req.params.id;
        const commandeToDelete = await commande.findByIdAndDelete(id);
        if(!commandeToDelete){
            return res.status(404).json({message : "Commande non trouvée, impossible d'effacer !!!"});
        }
        //  res.sendStatus(204);
         res.status(201).json({message : "commande effacée"});
    },
    getByStatus : async (req,res) => {
        const status = req.params.status;
        const commandeToAff= await commande.find({status})
        .populate({
            path: 'burger.burgerID',
            populate : {
                path : 'allergeneID',
                select: { name: 1, _id: 0 }
              },
            select: { name: 1, allergeneID:1, prix: 1, _id: 0 }
        })
        .populate({
            path: 'burger.supplementID',
            select: { name: 1, prix: 1, _id: 0 }
        })
        .populate({
            path: 'userID',
            select: { email: 1, adresse: 1, _id: 0 }
        })
    
        res.status(200).json(commandeToAff);
        
    // res.status(200).json(commandeToAff);
        
    },
    getByuserID : async (req,res) => {
        const userid2 = req.params.userID;
        console.log(req.params.userID)
        const commandeToAff= await commande.find({userID: userid2})
        .populate({
            path: 'burger.burgerID',
            populate : {
                path : 'allergeneID',
                select: { name: 1, _id: 0 }
              },
            select: { name: 1, allergeneID:1, prix: 1, _id: 0 }
        })
        .populate({
            path: 'burger.supplementID',
            select: { name: 1, prix: 1, _id: 0 }
        })
        .populate({
            path: 'userID',
            select: { email: 1, adresse: 1, _id: 0 }
        })
    
        res.status(200).json(commandeToAff);
        
    // res.status(200).json(commandeToAff);
        
    }



}


module.exports = CommandeController;