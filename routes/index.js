const burgerRouter = require('./burger-routers');
const commandeRouter = require('./commande-routers');
const ingredientRouter = require('./ingredient-routers');
const loginRouter = require('./login-router');
const userRouter = require('./user-routers');

const router = require('express').Router();

router.use('/burger', burgerRouter);
router.use('/commande', commandeRouter);
router.use('/user', userRouter);
router.use('/ingredient', ingredientRouter);
router.use('/auth', loginRouter);

module.exports = router;
