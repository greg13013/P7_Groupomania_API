const db = require("../models");

const postModel = db.post;
const userModel = db.user;


exports.like = (req, res) => {

    const postId = req.params.id;
    const userId = req.auth.userId;

    postModel.findByPk(postId).then(post => {
        if (!post) {
            console.log("post not found!");
           return  res.status(400).json({message: 'Erreur post not found'});
        }
        userModel.findByPk(userId).then(user => {
            if (!user) {
                console.log("user not found!");
               return res.status(400).json({message: 'Erreur user not found'});
            }
            post.addLike(user);
            res.status(200).json({ message: 'Like' })
        })
    })

}

exports.supprimerLike = (req, res) => {

    const postId = req.params.id;
    const userId = req.auth.userId;

    postModel.findByPk(postId).then(post => {
        if (!post) {
            console.log("post not found!");
           return res.status(400).json({message: 'Erreur post not found'});
        }
        userModel.findByPk(userId).then(user => {
            if (!user) {
                console.log("user not found!");
                return res.status(400).json({message: 'Erreur user not found'}); 
            }
            post.removeLike(user); 
            res.status(200).json({ message: 'Like supprimé' })
        })
    })

}