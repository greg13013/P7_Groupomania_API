const db = require("../models");

const postModel = db.post;
const userModel = db.user;


exports.like = (req, res) => {

    postModel.findByPk(req.body.postId).then(post => {
        if (!post) {
            console.log("post not found!");
           return  res.status(400).json({message: 'Erreur post not found'});
        }
        userModel.findByPk(req.body.userId).then(user => {
            if (!user) {
                console.log("user not found!");
               return res.status(400).json({message: 'Erreur user not found'});
            }
            post.addUser(user);
            res.status(200).json({ message: 'Like' })
        })
    })

}

exports.dislike = (req, res) => {

    postModel.findByPk(req.body.postId).then(post => {
        if (!post) {
            console.log("post not found!");
           return res.status(400).json({message: 'Erreur post not found'});
        }
        userModel.findByPk(req.body.userId).then(user => {
            if (!user) {
                console.log("user not found!");
                return res.status(400).json({message: 'Erreur user not found'}); 
            }
            post.removeUser(user); 
            res.status(200).json({ message: 'Dislike' })
        })
    })

}