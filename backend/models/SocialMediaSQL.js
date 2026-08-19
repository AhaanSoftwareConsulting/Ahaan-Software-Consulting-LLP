const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SocialMedia = sequelize.define(
  "social_media",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    backgroundColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "social_media",
    timestamps: true,
  }
);

module.exports = SocialMedia;