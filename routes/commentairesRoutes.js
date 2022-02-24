const express = require('express');

const router = express.Router();

const commentairesCtrl = require('../controllers/commentairesCtrl.js');

//middleware pour authentification
const auth = require('../middleware/auth');

const verifBody = require('../middleware/verifContenuSiVide');

router.post('/', auth, commentairesCtrl.create);
router.get('/',  auth, commentairesCtrl.getAll);
router.get('/:id',  auth, commentairesCtrl.getCommentaire);
router.put('/:id',  auth, commentairesCtrl.update);
router.delete('/:id',  auth, commentairesCtrl.delete);


module.exports = router;