const { Sequelize } = require("sequelize");
const { applyRelationships } = require("./relationships");

// Connection
const sequelize = new Sequelize(process.env.POSTGRES_URL)


const modelDefiners = [
  require("./models/user.model"),
  require("./models/product.model"),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
/* applyRelationships(sequelize); */

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;