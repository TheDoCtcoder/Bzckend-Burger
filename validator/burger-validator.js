const yup = require('yup');
const idRegex = /^[a-f\d]{24}$/i;

const burgerValidator = yup.object({
    name: yup.string().trim().required().min(5).max(50),
    ingredientID : yup.array().of(yup.string().required().matches(idRegex)),
    description : yup.string().trim().required().min(10).max(255), 
    prix: yup.number().max(999),
    allergeneID : yup.array().of(yup.string().required().matches(idRegex))
});

    

module.exports = burgerValidator;