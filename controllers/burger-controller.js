const burger = require('../models/burger-models');

const BurgerController = {

    Create : async (req,res) => {
        const burgerToAdd = burger(req.body);
        await burgerToAdd.save();
        res.status(200).json(burgerToAdd)
    },
    GetAll : async (req,res) => {
        const offset = req.query.offset ? req.query.offset : 0;
        const limit = req.query.limit ? req.query.limit : 10;
    
        let allergeneFilter;
        const allergene = req.query.ingredientID;
    
    
        if(allergene) {
                if(Array.isArray(allergene)){
                    // allergeneFilter = {allergeneID : {$nin : allergene}}
                    allergeneFilter = {ingredientID : {$nin : allergene}}
                }
                else {
                    allergeneFilter = {ingredientID :  {$nin : allergene}}
                    // allergeneFilter = {allergeneID : {$nin: allergene}}
                }
        }
    
        else {
            allergeneFilter = {}
        }
        console.log(allergeneFilter)
        const burgerToAff = await burger.find( allergeneFilter)
        // const burgerToAff = await burger.find( { allergeneID: {$nin: '62e917ceec940d3d7b79a2da'} })
        // const burgerToAff = await burger.find({ allergeneID: {$not: 62e917ceec940d3d7b79a2da }})
        .populate({
            path : 'ingredientID',
            select : {name : 1, _id:0}
        })
        .populate({
            path : 'allergeneID',
            select : {name : 1, _id:0}
        }).limit(limit).skip(offset)
        const count = await burger.countDocuments();
const data = {'burgerToAff' : burgerToAff, count : count}

res.status(200).json(data);
        // res.status(200).json(burgerToAff);
    },
    GetByID : async (req,res) => {
        const id = req.params.id;
        const burgerById = await burger.findById(id);
        if(!burgerById){
            return res.status(404).json({message : "Burger non trouvé"})
        }

        res.status(200).json(burgerById);
    },

    Update: async (req, res) => {
        const id =  req.params.id;
        const {name, ingredientID, description, prix, allergeneID} = req.body
       const burgerUpdated = await burger.findByIdAndUpdate(id, {
            name,
            ingredientID,
            description,
            prix,
            allergeneID
    
        }, { returnDocument : 'after'});
        if(!burgerUpdated){
            return res.sendStatus(404);
        }
        res.status(201).json({message : "burger modifiée"});
    
    
    },
    delete : async (req, res) => {
        const id = req.params.id;
        const burgerToDelete = await burger.findByIdAndDelete(id);
        if(!burgerToDelete){
            return res.status(404).json({message : "Burger pas trouvé, impossible d'effacer !!!"});
        }
        //  res.sendStatus(204);
         res.status(201).json({message : "burger effacé"});
    }

}


module.exports = BurgerController;