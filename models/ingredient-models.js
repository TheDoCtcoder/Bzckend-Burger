const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({

    name: { type: String, required: true, unique: true, trim: true },
    allergene: { type: Boolean, trim: true, default : false },
    prix: { type: Number, required: true, trim: true, default : 0 }

}, { collection: "Ingredient", timestamps: true}
);

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;

