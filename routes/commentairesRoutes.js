const express = require('express');

const router = express.Router();

const commentairesCtrl = require('../controllers/commentairesCtrl.js');

//middleware pour authentification
const auth = require('../middleware/auth');

const verifBody = require('../middleware/verifContenuSiVide');

router.post('/',verifBody, auth, commentairesCtrl.create);
router.get('/',verifBody,  auth, commentairesCtrl.getAll);
router.get('/:id',verifBody,  auth, commentairesCtrl.getCommentaire);
router.put('/:id',verifBody,  auth, commentairesCtrl.update);
router.delete('/:id',verifBody,  auth, commentairesCtrl.delete);


module.exports = router;