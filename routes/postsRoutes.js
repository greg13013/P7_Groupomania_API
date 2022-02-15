const express = require('express');

const router = express.Router();

const postsCtrl = require('../controllers/postsCtrl.js');

//middleware pour authentification et image
const auth = require('../middleware/auth');
const verifBody = require('../middleware/verifContenuSiVide');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postsCtrl.create);
router.get('/', auth, postsCtrl.getAll);
router.get('/:id', auth, postsCtrl.getPost);
router.put('/:id', auth, multer, postsCtrl.update);
router.delete('/:id', auth, postsCtrl.delete);


module.exports = router;