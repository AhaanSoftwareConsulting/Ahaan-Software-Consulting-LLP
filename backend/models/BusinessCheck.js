const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BusinessCheck = sequelize.define(
  "BusinessCheck",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    business: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    mobile: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue(
          "email",
          value ? value.trim().toLowerCase() : value
        );
      },
    },

    websiteStatus: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "website_status",
    },

    improvements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    interest: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    timeline: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    discussion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    referral: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    referralDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "referral_details",
    },

    hasSpun: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "has_spun",
    },

    prizeWon: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "prize_won",
    },

    spunAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "spun_at",
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "business_checks",

    // IMPORTANT:
    // We are manually defining createdAt above.
    // Sequelize will NOT expect updated_at.
    timestamps: false,
  }
);

module.exports = BusinessCheck;