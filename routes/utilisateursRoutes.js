const express = require('express');

const router = express.Router();

const utilisateursCtrl = require('../controllers/utilisateursCtrl');

//middleware pour authentification et image
const auth = require('../middleware/auth');
const verifBody = require('../middleware/verifContenuSiVide');
const multer = require('../middleware/multer-config');

router.post('/signup',verifBody, multer, utilisateursCtrl.signup);
router.post('/login',verifBody, utilisateursCtrl.login);
router.get('/',verifBody, auth, utilisateursCtrl.getAll);
router.get('/:id',verifBody, auth, utilisateursCtrl.getUser);
router.put('/:id',verifBody, auth, multer, utilisateursCtrl.update);
router.delete('/:id',verifBody, auth, utilisateursCtrl.delete);


module.exports = router;