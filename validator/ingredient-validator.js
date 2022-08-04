const yup = require('yup');

const ingredientValidator = yup.object({
    name: yup.string().trim().required().max(255),
    allergene: yup.boolean(),
    prix: yup.number().max(999)
});

module.exports = ingredientValidator;