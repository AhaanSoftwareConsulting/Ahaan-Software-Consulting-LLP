const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FormData = sequelize.define(
  "form_datas",
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
      validate: {
        isEmail: true,
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
      type: DataTypes.ENUM(
        "Below $1000",
        "$1000 - $5000",
        "Above $5000"
      ),
      allowNull: false,
    },

    projectDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "form_datas",
    timestamps: true,
  }
);

module.exports = FormData;