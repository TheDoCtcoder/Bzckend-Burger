const yup = require('yup');
const idRegex = /^[a-f\d]{24}$/i;
const statuscommande = /^(Created)|(Processing)|(Done)$/i;

const commandeValidator = yup.object({

    burger: yup.array().of(yup.object({
        burgerID: yup.string().required().matches(idRegex),
        quantite: yup.number().required().min(1),
        supplementID: yup.array().of(yup.string().matches(idRegex))
    })),
    status: yup.string().matches(statuscommande),
    userID: yup.string().required().matches(idRegex),
    remarque: yup.string().trim().min(10).max(255),

});

module.exports = commandeValidator;

