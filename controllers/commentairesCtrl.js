const db = require("../models");
const commentaireModel = db.commentaire;


  //Retourne un seul post
exports.getCommentaire = (req, res) => {
    const id = req.params.id;
    commentaireModel.findOne({ where: {id: id}}).then(post => {
        if (!post) {
            return res.status(401).json({ error: 'Commentaire non trouvé !' });
          }
          res.status(200).json(post)
        }).catch(error => res.status(500).json({ error }))
}

//Retourne tous les commentaires
exports.getAll = (req, res) => {
    commentaireModel.findAll().then(commentaires => {
        res.status(200).json(commentaires)
    }).catch(error => res.status(500).json({ error }))
}

//Creer commentaire
exports.create = (req, res) => {

    const userId = req.auth.userId
    const postId = req.body.postId

    const commentaire = {
        contenu: req.body.contenu,
        userId: userId,
        postId: postId
    }
    console.log(commentaire);
    commentaireModel.create(commentaire)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur lors de la création du commentaire."
            });
        })

}

//update commentaire
exports.update = (req, res) => {
    const id = req.params.id;

    const commentaire = {
      ...req.body
    }

    console.log(commentaire);

    commentaireModel.update(commentaire, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Commentaire modifié avec succès."
            });
          } else {
            res.send({
              message: `Impossible de modifier le commentaire avec id=${id}. Peut etre introuvable!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Impossible de modifier le commentaire avec id=" + id
          });
        });
}

//delete commentaire
exports.delete = (req, res) => {
    const id = req.params.id;
    commentaireModel.destroy({
      where: { id: id }
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Le commentaire a été supprimé !"
          });
        } else {
          res.send({
            message: `Impossible de supprimer le commentaire avec id=${id}. Peut etre introuvable!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Impossible de supprimer le commentaire avec id=" + id
        });
      });
  };