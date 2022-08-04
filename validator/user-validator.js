const yup = require('yup');
const droitRegex = /^(Client)|(Admin)$/i;

const userValidator = yup.object({
    email: yup.string().trim().email().required().max(255),
    prenom: yup.string().trim().required().max(150),
    nom: yup.string().trim().required().max(150),
    droit: yup.string().matches(droitRegex),

    adresse: yup.object().shape({
        ville: yup.string().trim().required().max(150),
        cpostal: yup.string().trim().required().max(150),
        rue: yup.string().trim().required().max(150),
        numero: yup.string().trim().required().max(10),
        boite: yup.string().trim().max(10),
    })

});
module.exports = userValidator;