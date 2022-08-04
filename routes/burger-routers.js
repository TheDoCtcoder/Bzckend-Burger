
const burgerController = require('../controllers/burger-controller')
const idValidator = require('../middlewares/idValidator');
const authentication = require('../middlewares/auth-jwt-middleware');
const bodyValidation = require('../middlewares/body-validation');
const burgerValidator = require('../validator/burger-validator');
const burgerRouter = require('express').Router();

burgerRouter.post('/',authentication(["Admin"]),bodyValidation(burgerValidator), burgerController.Create);
burgerRouter.get('/', burgerController.GetAll);
burgerRouter.get('/:id',authentication(["Admin"]),idValidator(), burgerController.GetByID);
burgerRouter.put('/:id',authentication(["Admin"]),idValidator(), bodyValidation(burgerValidator), burgerController.Update);
burgerRouter.delete('/:id',authentication(["Admin"]),idValidator(), burgerController.delete);

module.exports = burgerRouter;