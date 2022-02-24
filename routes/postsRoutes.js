const express = require('express');

const router = express.Router();

const postsCtrl = require('../controllers/postsCtrl.js');
const likesCtrl = require('../controllers/likesCtrl.js');
const dislikesCtrl = require('../controllers/dislikesCtrl.js');

//middleware pour authentification et image
const auth = require('../middleware/auth');
const verifBody = require('../middleware/verifContenuSiVide');
const multer = require('../middleware/multer-configPost');


router.post('/', auth, multer, postsCtrl.create);
router.get('/', auth, postsCtrl.getAll);
router.get('/:id', auth, postsCtrl.getPost);
router.put('/:id', auth, multer, postsCtrl.update);
router.delete('/:id', auth, postsCtrl.delete);

//Post avec like & dislike
router.get('/likesDislikes', auth, postsCtrl.getPostsWithLikesWithDislikes);
router.get('/:id/likesDislikes', auth, postsCtrl.getPostWithLikeDislike);

//SECTION LIKE
router.post('/:id/like', auth, likesCtrl.like);
router.post('/:id/suppLike', auth, likesCtrl.supprimerLike);


//SECTION DISLIKE
router.post('/:id/dislike', auth, dislikesCtrl.dislike);
router.post('/:id/suppDislike', auth, dislikesCtrl.supprimerDislike);

module.exports = router;