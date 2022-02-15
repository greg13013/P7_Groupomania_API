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
    
}

//Creer commentaire
exports.create = (req, res) => {

}

//update commentaire
exports.update = (req, res) => {

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