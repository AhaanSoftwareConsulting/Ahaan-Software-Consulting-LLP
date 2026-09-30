const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Development = sequelize.define(
  "Development",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    developer: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.ENUM(
        "e-commerce",
        "healthcare",
        "education",
        "travel",
        "food-restaurant",
        "automotive",
        "real-estate",
        "business",
        "technology",
        "sports",
        "fashion",
        "entertainment",
        "portfolio",
        "others",
      ),
      allowNull: false,
      defaultValue: "others",
    },
  },
  {
    tableName: "developments",
    timestamps: true,
  },
);

module.exports = Development;
