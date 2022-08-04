const Ingredient = require('../models/ingredient-models');

const IngredientController = {

    Create : async (req,res) => {
        const ingredientToAdd = Ingredient(req.body);
        await ingredientToAdd.save();
        res.status(200).json(ingredientToAdd)
    },
    GetAll : async (req,res) => {
        const ingredientToAff = await Ingredient.find();
        res.status(200).json(ingredientToAff);
    },
    GetByID : async (req,res) => {
        const id = req.params.id;
        const ingredientById = await Ingredient.findById(id);
        if(!ingredientById){
            return res.status(404).json({message : "Ingredient non trouvé"})
        }

        res.status(200).json(ingredientById);
    },
    Update: async (req, res) => {
        const id =  req.params.id;
        const {name, allergene, prix} = req.body
       const ingredientUpdated = await Ingredient.findByIdAndUpdate(id, {
            name,
            allergene,
            prix
    
        }, { returnDocument : 'after'});
        if(!ingredientUpdated){
            // return res.sendStatus(404);
            return res.status(404).json({Message : "Ingrédient non trouvé"});
        }
        res.status(201).json({message : "Ingrédient modifié"});
    
    
    },
    delete : async (req, res) => {
        const id = req.params.id;
        const ingredientToDelete = await Ingredient.findByIdAndDelete(id);
        if(!ingredientToDelete){
            return res.status(404).json({message : "Ingrédient non trouvé, impossible d'effacer !!!"});
        }
        //  res.sendStatus(204);
         res.status(201).json({message : "Ingrédient effacé"});
    }
}


module.exports = IngredientController;