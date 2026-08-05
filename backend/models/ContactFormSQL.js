const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ContactForm = sequelize.define(
  "contact_forms",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "contact_forms",
    timestamps: true,
  }
);

module.exports = ContactForm;