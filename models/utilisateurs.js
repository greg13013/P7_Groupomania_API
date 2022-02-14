module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    admin: {
      type: Sequelize.BOOLEAN
    }
  });
  return User;
};