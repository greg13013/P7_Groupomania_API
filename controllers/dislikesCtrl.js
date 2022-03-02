const db = require("../models");

const postModel = db.post;
const userModel = db.user;

const dislikes = db.dislike;
const likes = db.like;

exports.dislike = (req, res) => {

    const postId = req.params.id;
    const userId = req.auth.userId;


    likes.findOne({ where: { userId: userId, postId: postId } }).then(data => {
        console.log('verif like ', data);

        if (data) {
            return res.status(400).json({ message: 'Annulez dabord like' });
        }

        postModel.findByPk(postId).then(post => {
            if (!post) {
                console.log("post not found!");
                return res.status(400).json({ message: 'Erreur post not found' });
            }
            userModel.findByPk(userId).then(user => {
                if (!user) {
                    console.log("user not found!");
                    return res.status(400).json({ message: 'Erreur user not found' });
                }
                dislikes.findOne({where: {userId: userId, postId: postId}}).then(data => {
                    if(data) {
                        post.removeDislike(user);
                        res.status(200).json({ message: 'Dislike supprimé' })
                    } else {
                        
                        post.addDislike(user);
                        res.status(200).json({ message: 'Dislike' })
                    }
                })
            })
        })
    }).catch(err => console.log(err));
}
