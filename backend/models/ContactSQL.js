const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // আপনার db.js ফাইলের Path

const ContactForm = sequelize.define(
  "ContactForm",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "contact_data", 
    timestamps: true,
  }
);

module.exports = ContactForm;