const { Schema, model, Types } = require('mongoose');
const Burger = require('../models/burger-models');
const supplement = require('../models/ingredient-models');
const User = require('../models/user-models');

const commandeSchema = new Schema({

    burger: [{
        burgerID: { type: Types.ObjectId, ref: Burger, required: true },
        quantite: {
            type: String,
            required: true,
            trim: true
        },
        supplementID: [{ type: Types.ObjectId, ref: supplement, default: undefined }
        ],
    }],
    status: {
        type: String,
        enum: ['Created', 'Processing', 'Done'],
        default: 'Created',
        required: true,

    },
    userID: { type: Types.ObjectId, ref: User, required: true },
    remarque: { type: String, trim: true },


}, {
    collection: "Commande",
    timestamps: true
});
const Commande = model("Commande", commandeSchema);

module.exports = Commande;

