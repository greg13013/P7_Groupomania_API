module.exports = (sequelize, Sequelize) => {
    const Commentaire = sequelize.define("commentaire", {
      contenu: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      postId: {
        type: Sequelize.INTEGER
      },
    });
    return Commentaire;
  };