const yup = require('yup');
const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).+$/;
const droitRegex = /^(Client)|(Admin)$/i;

const registerValidator = yup.object({
    email: yup.string().trim().email().required().max(255),
    prenom: yup.string().trim().required().max(150),
    nom: yup.string().trim().required().max(150),
    droit: yup.string().matches(droitRegex),
    password : yup.string().required().min(8).max(64).matches(pwdRegex),
    tel: yup.string().required(),

    adresse: yup.object().shape({
        ville: yup.string().trim().required().max(150),
        cpostal: yup.string().trim().required().max(150),
        rue: yup.string().trim().required().max(150),
        numero: yup.string().trim().required().max(10),
        boite: yup.string().trim().max(10),
    })
    

});


const loginValidator = yup.object({
    email : yup.string().trim().email().required().max(255),
    password : yup.string().required()
});

module.exports = { registerValidator, loginValidator};