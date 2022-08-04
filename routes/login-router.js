const loginController = require("../controllers/login-controller");
const bodyValidation = require("../middlewares/body-validation");
const {registerValidator, loginValidator} = require('../validator/auth-validator');

const loginRouter = require('express').Router();

loginRouter.post('/login',bodyValidation(loginValidator), loginController.login);
loginRouter.post('/register',bodyValidation(registerValidator), loginController.register);

module.exports = loginRouter;
