const express = require('express');
const db = require("./models");

//Sécurités
const toobusy = require ('toobusy-js');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const hsts = require('hsts');

const app = express();

const path = require('path');

// middleware qui bloque les requetes quand surchargé
app.use(function(req, res, next) {
  if (toobusy()) {
    res.send(503, "I'm busy right now, sorry.");
  } else {
    next();
  }
});

//Limite le flood du même utilisateur (IP)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Applique une limitation pour les requêtes
app.use(limiter)

//Vérifie les parametres de la requete
app.use(hpp());

//Assure l'utilisation de https
app.use(hsts({
  maxAge: 15552000  // 180 days in seconds
}))

app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  //Mise à zero bdd
  // db.sequelize.sync({ force: true }).then(() => {
  //   console.log("Drop and re-sync db.");
  // });

  app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to groupomania api." });
    next();
  });



const utilisateurRoutes = require('./routes/utilisateursRoutes');

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/utilisateur', utilisateurRoutes);


module.exports = app;