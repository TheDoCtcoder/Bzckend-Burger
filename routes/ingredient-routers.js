const ingredientController = require('../controllers/ingredient-controller');
const idValidator = require('../middlewares/idValidator');
const authentication = require('../middlewares/auth-jwt-middleware');
const ingredientValidator = require('../validator/ingredient-validator');
const bodyValidation = require('../middlewares/body-validation');

const ingredientRouter = require('express').Router();



ingredientRouter.post('/',authentication(["Admin"]),bodyValidation(ingredientValidator), ingredientController.Create);
ingredientRouter.get('/', ingredientController.GetAll);
ingredientRouter.get('/:id',authentication(["Admin"]),idValidator(), ingredientController.GetByID);
ingredientRouter.put('/:id',authentication(["Admin"]),idValidator(), bodyValidation(ingredientValidator),ingredientController.Update);
ingredientRouter.delete('/:id',authentication(["Admin"]),idValidator(), ingredientController.delete);

module.exports = ingredientRouter;