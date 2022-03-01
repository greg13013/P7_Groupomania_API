const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');

const db = require("../models");
const UserModel = db.user;

//Créer un compte utilisateur
exports.signup = (req, res, next) => {
  //Utilisation de bcrypt pour le hash du mot de passe

  UserModel.findOne({ where: { email: req.body.email } })
    .then(data => {
      if (data !== null) {

        return res.status(400).json({ error: 'Utilisateur deja existant' });
      }
      else {
        console.log('file upload : ', req.file)
        console.log('body upload : ', req.body)
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const user = {
              username: req.body.username,
              email: req.body.email,
              password: hash,
              admin: req.body.admin,
              image: req.file ? `${req.protocol}://${req.get('host')}/images/utilisateurs/${req.file.filename}` : 'Aucune image'
            };

            // Creer l'utilisateur dans la bdd
            console.log(user);
            UserModel.create(user)
              .then(data => {
                res.send(data);
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Erreur lors de la création de l'utilisateur."
                });
              });
          })
          .catch(error => res.status(500).json({ message: error }));
      }

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Erreur lors de la récupération de l'utilisateur"
      });
    });


};

//Login de l'utilisateur
exports.login = (req, res, next) => {
  UserModel.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      //Compare le mot de passe de la base de donnée à celui envoyer par l'utilisateur
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }

          //Création du token d'authentification avec un délai d'expirations
          let token = jwt.sign(
            { userId: user.id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
          );


          res.status(200).json({
            userId: user.id,
            token: token
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//getAll Utilisateur
exports.getAll = (req, res, next) => {
  UserModel.findAll().then(data => {
    res.status(200).json(data)
  }).catch(error => res.status(500).json({ error }))
}

//getOne Utilisateur
exports.getUser = (req, res, next) => {
  const id = req.params.id;
  UserModel.findOne({ where: { id: id } }).then(data => {
    if (!data) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    res.status(200).json(data)
  }).catch(error => res.status(500).json({ error }))
}

//delete fichier
async function deleteFichier(id) {
  UserModel.findOne({ where: { id: id } })
    .then(user => {
      if (user.image) {
        const filename = user.image.split('images/utilisateurs/')[1];
        fs.unlink(`images/utilisateurs/${filename}`, () => { });
      }
    }).catch(error => { return error })
}

//update User
exports.update = async (req, res, next) => {


  const id = req.params.id;

  await UserModel.findOne({ where: { email: req.body.email } })
    .then(async data => {

      if (data !== null && data.dataValues.id != id) {
        return res.status(400).json({ error: 'Utilisateur deja existant' })
      }

      req.file ? await deleteFichier(id) : null;

      const user = req.file ? {
        ...req.body,
        image: `${req.protocol}://${req.get('host')}/images/utilisateurs/${req.file.filename}`,
      } : {
        ...req.body
      }

      await UserModel.update(user, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Utilisateur a été modifié avec succès."
            });
          } else {
            res.send({
              message: `Impossible de modifier l'utilisateur avec id=${id}. Peut etre introuvable!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Impossible de modifier l'utilisateur avec id=" + id
          });
        });
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Erreur lors de la récupération de l'utilisateur"
      });
    });
};

//delete Utilisateur ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  UserModel.findOne({ where: { id: id } })
    .then(user => {
      if (user.image) {
        const filename = user.image.split('images/utilisateurs/')[1];
        fs.unlink(`images/utilisateurs/${filename}`, () => {

          UserModel.destroy({
            where: { id: id }
          })
            .then((num) => {
              if (num == 1) {
                res.send({
                  message: "L'utilisateur a été supprimé !"
                });
              } else {
                res.send({
                  message: `Impossible de supprimer l'utilisateur avec id=${id}. Peut etre introuvable!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Impossible de supprimer l'utilisateur avec id=" + id
              });
            });
        });
      }
    }).catch(error => { return error })
};