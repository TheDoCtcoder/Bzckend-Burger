const { Schema, model, Types } = require('mongoose');
const Ingredient = require('./ingredient-models');

const burgerSchema = new Schema({

    name: { type: String, required: true,unique: true,trim: true },
    ingredientID : [{type : Types.ObjectId, ref : Ingredient, required : true }],
    description: { type: String, required: true, trim: true },
    prix: { type: String, required: true, trim: true },
    allergeneID:  [{type : Types.ObjectId, ref : Ingredient, required : true}]

}, {
    collection: "burger",
    timestamps: true
});
const Burger = model("Burger", burgerSchema);

module.exports = Burger;

