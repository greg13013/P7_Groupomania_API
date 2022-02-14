module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      contenu: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
    });
    return Post;
  };