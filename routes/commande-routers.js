const CommandeController = require('../controllers/commande-controller');
const idValidator = require('../middlewares/idValidator');
const commandeRouter = require('express').Router();
const authentication = require('../middlewares/auth-jwt-middleware');
const bodyValidation = require('../middlewares/body-validation');
const commandeValidator = require('../validator/commande-validator');

commandeRouter.post('/',authentication(), bodyValidation(commandeValidator), CommandeController.Create);
commandeRouter.get('/',authentication(["Admin"]), CommandeController.GetAll);
commandeRouter.get('/:id',authentication(),idValidator(), CommandeController.GetByID);
commandeRouter.put('/:id',authentication(["Admin"]),idValidator(),bodyValidation(commandeValidator), CommandeController.Update);
commandeRouter.delete('/:id',authentication(["Admin"]),idValidator(), CommandeController.delete);
commandeRouter.get('/status/:status',authentication(["Admin"]), CommandeController.getByStatus);
commandeRouter.get('/usercommande/:userID',authentication(["Admin"]), CommandeController.getByuserID);

module.exports = commandeRouter;