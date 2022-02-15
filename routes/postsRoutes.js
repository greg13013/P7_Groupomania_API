const express = require('express');

const router = express.Router();

const postsCtrl = require('../controllers/postsCtrl.js');

//middleware pour authentification et image
const auth = require('../middleware/auth');
const verifBody = require('../middleware/verifContenuSiVide');
const multer = require('../middleware/multer-config');

router.post('/',verifBody, auth, multer, postsCtrl.create);
router.get('/',verifBody, auth, postsCtrl.getAll);
router.get('/:id',verifBody, auth, postsCtrl.getPost);
router.put('/:id',verifBody, auth, multer, postsCtrl.update);
router.delete('/:id',verifBody, auth, postsCtrl.delete);


module.exports = router;