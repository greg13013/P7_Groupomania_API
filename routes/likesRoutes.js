const express = require('express');

const router = express.Router();

const likesCtrl = require('../controllers/likesCtrl.js');

//middleware pour authentification et image
const auth = require('../middleware/auth');

// router.post('/',verifBody, auth, multer, postsCtrl.create);
// router.get('/',verifBody, auth, postsCtrl.getAll);
// router.get('/:id',verifBody, auth, postsCtrl.getPost);
// router.put('/:id',verifBody, auth, multer, postsCtrl.update);
// router.delete('/:id',verifBody, auth, postsCtrl.delete);

router.post('/', auth, likesCtrl.like);
router.post('/dislike', auth, likesCtrl.dislike);

module.exports = router;