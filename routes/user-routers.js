const UserController = require('../controllers/user-controller');
const idValidator = require('../middlewares/idValidator');
const authentication = require('../middlewares/auth-jwt-middleware');
const userValidator = require('../validator/user-validator');
const bodyValidation = require('../middlewares/body-validation');

const userRouter = require('express').Router();

// userRouter.post('/', UserController.Create);
userRouter.get('/',authentication(["Admin"]), UserController.GetAll);
userRouter.get('/:id',authentication(), idValidator(), UserController.GetByID);
userRouter.put('/:id',authentication(), idValidator(),bodyValidation(userValidator), UserController.Update);
userRouter.delete('/:id',authentication(["Admin"]),idValidator(), UserController.delete);


module.exports = userRouter;