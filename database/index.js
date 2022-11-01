const { Sequelize } = require("sequelize");
const { applyRelationships } = require("./relationships");

// Connection
const sequelize = new Sequelize(
  process.env.NODE_ENV === "development"
    ? process.env.POSTGRES_URL
    : {
        username: "ezbrepckihmpib",
        password:
          "28e80dfbb136d8d13a24e6a6b7e9f8727ee925902b20640a00b5e7477c59f66a",
        database: "dafdhbc02qpjag",
        port: 5432,
        host: "ec2-54-229-217-195.eu-west-1.compute.amazonaws.com",
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
