const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // আপনার db.js ফাইলের Path

const Connect = sequelize.define(
  "Connect",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Your name is required" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Your email is required" },
        isEmail: { msg: "Invalid email address" },
      },
    },
    service: {
      type: DataTypes.ENUM(
        "Web Development",
        "App Development",
        "UI/UX Design",
        "E-Commerce Development",
        "Digital Marketing"
      ),
      allowNull: false,
    },
    budget: {
      type: DataTypes.ENUM("Below $1000", "$1000 - $5000", "Above $5000"),
      allowNull: false,
    },
    projectDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "connect_data",
    timestamps: true,
  }
);

module.exports = Connect;