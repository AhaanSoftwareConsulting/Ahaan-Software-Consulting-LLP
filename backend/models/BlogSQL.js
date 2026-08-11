const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Blog = sequelize.define(
  "blogs",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Ahaan Software",
    },

    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    author_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    thumbs_up: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    love: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "blogs",
    timestamps: true,
  }
);

module.exports = Blog;