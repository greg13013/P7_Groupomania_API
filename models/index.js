//import configuration bdd
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


/* ********** INIT TABLE ********** */

db.user = require("./utilisateurs.js")(sequelize, Sequelize);
db.post = require("./posts.js")(sequelize, Sequelize);
db.commentaire = require("./commentaires.js")(sequelize, Sequelize);


db.like = sequelize.define('like');

/* Relation OneToMany 
1 utilisateur a une list post
*/

db.user.hasMany(db.post, { as: "post" });
db.post.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

/* Relation OneToMany 
1 utilisateur a une list commentaire
*/

db.user.hasMany(db.commentaire, { as: "commentaire" });
db.commentaire.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

/* Relation OneToMany 
1 post a une list commentaire
*/

db.post.hasMany(db.commentaire, { as: "commentaire" });
db.commentaire.belongsTo(db.post, {
  foreignKey: "postId",
  as: "post",
});


//Relation many to many

db.user.belongsToMany(db.post, {through: db.like})


module.exports = db;