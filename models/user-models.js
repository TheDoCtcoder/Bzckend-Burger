const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    prenom: {
        type : String,
        required: true,
        trim : true
    },
    nom: {
        type : String,
        required: true,
        trim : true
    },
    droit : {
        type : String,
        enum : ['Client', 'Admin'],
        default : 'Client',
        required : true
    
    },
    password : {
        type : String,
        required : true

    },

    tel: {
        type : String,
        required : true,
        trim : true
    },
    adresse: {
        ville: {
            type: String,
            required: true,
            trim: true
        },
        cpostal: {
            type: String,
            required: true,
            trim: true
        },
        rue: {
            type: String,
            required: true,
            trim: true
        },
        numero: {
            type: String,
            required: true,
            trim: true
        },
        boite: {
            type: String,
            default : undefined,
            trim: true
        }
    }


}, {
    collection: "User",
    timestamps: true
});
const User = model("User", userSchema);

module.exports = User;

