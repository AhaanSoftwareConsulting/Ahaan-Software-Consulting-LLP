const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AppDev = sequelize.define(
  "app_dev",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    

  },
  {
    tableName: "app_dev",
    timestamps: true,
  }
);

module.exports = AppDev;