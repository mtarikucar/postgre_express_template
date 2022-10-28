const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imgpath: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.SMALLINT,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.SMALLINT,
      },
    },
    {
      tableName: "products",
      createdAt: true,
      updatedAt: true
    }
  );
  sequelize.sync({alter: true}); //force: true
};