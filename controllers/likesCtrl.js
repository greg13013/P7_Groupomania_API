const db = require("../models");

const postModel = db.post;
const userModel = db.user;

const dislikes = db.dislike;
const likes = db.like;

exports.like = async (req, res) => {

    const postId = req.params.id;
    const userId = req.auth.userId;


    // const verif = await verifDislikes(userId, postId);

    dislikes.findOne({ where: { userId: userId, postId: postId } }).then(data => {
        console.log('verif dislike ', data);

        if (data) {
            return res.status(400).json({ message: 'Annulez dabord dislike' });
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
                likes.findOne({where: {userId: userId, postId: postId}}).then(data => {
                    if(data) {
                        post.removeLike(user);
                        res.status(200).json({ message: 'Like supprimé' })
                    } else {
                        
                        post.addLike(user);
                        res.status(200).json({ message: 'Like' })
                    }
                })
            })
        })
    }).catch(err => console.log(err));
}
