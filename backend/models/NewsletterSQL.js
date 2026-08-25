const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); 

const Newsletter = sequelize.define(
  "Newsletter",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: "Invalid email format" },
      },
      set(value) {
        // lowercase and trim functionality
        if (value) {
          this.setDataValue("email", value.trim().toLowerCase());
        }
      },
    },
  },
  {
    tableName: "newsletters",
    timestamps: true,
  }
);

module.exports = Newsletter;