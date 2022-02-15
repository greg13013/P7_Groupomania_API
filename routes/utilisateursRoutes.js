const express = require('express');

const router = express.Router();

const utilisateursCtrl = require('../controllers/utilisateursCtrl');

//middleware pour authentification et image
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', multer, utilisateursCtrl.signup);
router.post('/login', utilisateursCtrl.login);
router.get('/', auth, utilisateursCtrl.getAll);
router.get('/:id', auth, utilisateursCtrl.getUser);
router.put('/:id', auth, multer, utilisateursCtrl.update);
router.delete('/:id', auth, utilisateursCtrl.delete);


module.exports = router;