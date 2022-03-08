const db = require("../models");
const fs = require('fs');
const postModel = db.post;

//delete fichier
async function deleteFichier(id) {
    postModel.findOne({ where: { id: id } })
        .then(post => {
            if (post.image) {

                const filename = post.image.split('/images/posts/')[1];
                fs.unlink(`images/${filename}`, () => { });
            }
        }).catch(error => { return error })
}

//Retourne un seul post
exports.getPost = (req, res) => {
    const id = req.params.id;
    postModel.findOne({ where: { id: id } }).then(post => {
        if (!post) {
            return res.status(401).json({ error: 'Post non trouvé !' });
        }
        res.status(200).json(post)
    }).catch(error => res.status(500).json({ error }))
}

//Retourne un seul post avec like & dislike
exports.getPostWithLikeDislike = (req, res) => {
    const id = req.params.id;
    postModel.findOne({
        where: { id: id }, include: [
            'Like',
            'Dislike'
        ]
    }).then(post => {
        if (!post) {
            return res.status(401).json({ error: 'Post non trouvé !' });
        }
        res.status(200).json(post)
    }).catch(error => res.status(500).json({ error }))
}

//Retourne Les post avec like et dislike
exports.getPostsWithLikesWithDislikesWithUser = (req, res) => {

    //Utilisez l'alias défini dans models/index.js de la relation many to many
    postModel.findAll({
        include: [
            'Like',
            'Dislike',
            'user'
        ]
    }).then(posts => {

        res.status(200).json(posts)

    }).catch(error => res.status(500).json({ error }))
}


//Retourne tous les post avec les users
exports.getAll = (req, res) => {
    postModel.findAll({ include: 'user' }).then(posts => {
        res.status(200).json(posts)
    }).catch(error => res.status(500).json({ error }))
}

//Creer post
exports.create = (req, res) => {

    const userId = req.auth.userId

    const post = {
        contenu: req.body.contenu,
        userId: userId,
        image: req.file ? `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}` : 'Aucune image'
    }
    console.log(post);
    postModel.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur lors de la création du post."
            });
        })
}

//update post
exports.update = async (req, res) => {

    const id = req.params.id;

    req.file ? await deleteFichier(id) : null;

    const post = req.file ? {
        ...req.body,
        image: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
    } : {
        ...req.body
    }

    console.log(post);

    postModel.update(post, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post modifié avec succès."
                });
            } else {
                res.send({
                    message: `Impossible de modifier le post avec id=${id}. Peut etre introuvable!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de modifier le post avec id=" + id
            });
        });
}

//delete POST ID
exports.delete = async (req, res) => {
    const id = req.params.id;
    postModel.findOne({ where: { id: id } })
        .then(post => {
            if (post.image) {
                const filename = post.image.split('images/posts/')[1];
                fs.unlink(`images/posts/${filename}`, () => {

                    postModel.destroy({
                        where: { id: id }
                    })
                        .then((num) => {
                            if (num == 1) {
                                res.send({
                                    message: "Le post a été supprimé !"
                                });
                            } else {
                                res.send({
                                    message: `Impossible de supprimer le post avec id=${id}. Peut etre introuvable!`
                                });
                            }
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Impossible de supprimer le post avec id=" + id
                            });
                        });
                });
            }
        }).catch(error => { return error })
};