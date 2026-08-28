const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // আপনার db.js ফাইলের Path

const Team = sequelize.define(
  "Team",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY, // YYYY-MM-DD ফরম্যাটের জন্য DATEONLY
      allowNull: false,
    },
    dateOfJoining: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "teams", // phpMyAdmin-এ আপনার টেবিলের নাম
    timestamps: true,
  }
);

module.exports = Team;