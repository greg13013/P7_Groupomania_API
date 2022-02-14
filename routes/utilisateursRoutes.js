const express = require('express');

const router = express.Router();

const utilisateursCtrl = require('../controllers/utilisateursCtrl');

router.post('/signup', utilisateursCtrl.signup);
router.post('/login', utilisateursCtrl.login);
router.get('/', utilisateursCtrl.getAll);
router.get('/:id', utilisateursCtrl.getUser);
router.put('/:id', utilisateursCtrl.update);
router.delete('/:id', utilisateursCtrl.delete);


module.exports = router;