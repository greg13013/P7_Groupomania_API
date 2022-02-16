const db = require("../models");

const postModel = db.post;
const userModel = db.user;


exports.dislike = (req, res) => {

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
            post.addDislike(user);
            res.status(200).json({ message: 'Dislike' })
        })
    })

}

exports.supprimerDislike = (req, res) => {

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
            post.removeDislike(user); 
            res.status(200).json({ message: 'Dislike supprimé' })
        })
    })

}