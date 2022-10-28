const { Sequelize } = require("sequelize");
const { applyRelationships } = require("./relationships");

// Connection
const sequelize = new Sequelize(
  process.env.NODE_ENV === "development"
    ? process.env.POSTGRES_URL
    : {
        username: "cvskhvyaytcicx",
        password:
          "0f009bf01d20c51aa22c82841e7a9d3c37e551bdff610508b7c7c4fbbeb11fbe",
        database: "d4f3q82uhpn3io",
        port: 5432,
        host: "ec2-99-80-170-190.eu-west-1.compute.amazonaws.com",
        ssl: false,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
              require: true,
              rejectUnauthorized: false
          }
       },
      }
);

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
