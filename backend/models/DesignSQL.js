const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Design = sequelize.define(
  "designs",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: true },
    image: { type: DataTypes.STRING, allowNull: false },
    designer: { type: DataTypes.STRING, allowNull: false },
    category: {
      type: DataTypes.ENUM(
        "electronics",
        "education-books",
        "business-services",
        "cars-motorcycles",
        "sports-outdoors-travel",
        "fashion-beauty",
        "defense-security",
        "it-tech",
        "food-restaurant",
        "entertainment",
        "travel",
        "society-people",
        "medical-healthcare",
        "real-estate",
        "web-banner",
        "business-card",
        "product-label",
        "others"
      ),
      allowNull: false,
    },
  },
  { tableName: "designs", timestamps: true }
);

module.exports = Design;