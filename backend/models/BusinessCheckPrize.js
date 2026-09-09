const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BusinessCheckPrize = sequelize.define(
  "BusinessCheckPrize",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    prize: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },

    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "business_check_prizes",
    timestamps: false,
  }
);

module.exports = BusinessCheckPrize;
