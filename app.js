// // Pour utiliser dotenv, on doit l'importer
// let dotenv = require("dotenv-flow");
// // pour charger tous nos fichiers .env.
// dotenv.config();

//ou
require('dotenv-flow').config();
// console.log(process.env);
const VNODE = process.versions.node;
const {MESSAGE, NODE_ENV, PORT, DB_CONNECTION} = process.env;

// console.clear();
console.log(MESSAGE + "\n");
// console.log('Lancé en ', NODE_ENV, ' : ', MESSAGE);

const mongoose = require('mongoose');
const express = require('express');
require('express-async-errors');
const router = require('./routes');


const app = express();
app.use(express.json());



// app.get('/Users', (req, res) => {
//     const data  = {
//         msg : 'Coucou'
//     }
//     res.json(data);
// })

app.use( async (req, res, next) => {
    await mongoose.connect(DB_CONNECTION);
    console.log("réussie");
    next();
    })

app.use('/api', router);




app.listen(PORT, () => {

    console.log("Le serveur est lancé sur le port" + '\x1b[32m', + PORT + '\x1b[0m', "en environnement de " + NODE_ENV + "\navec la version " + '\x1b[32m' + VNODE + '\x1b[0m' + '\x1b[31m' + '\x1b[0m' + " de" + '\x1b[31m' + " NodeJS" + '\x1b[0m' + ".");
});

