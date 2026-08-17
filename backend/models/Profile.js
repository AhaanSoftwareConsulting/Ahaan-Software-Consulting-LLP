const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Profile = sequelize.define(
  "profiles",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    // ── Identity / basic info ─────────────────────────────
    full_name: { type: DataTypes.STRING, allowNull: true },
    avatar: { type: DataTypes.STRING, allowNull: true },
    gender: {
      type: DataTypes.ENUM("male", "female", "other", "prefer_not_to_say"),
      allowNull: true,
    },
    date_of_birth: { type: DataTypes.DATEONLY, allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },

    // ── Contact ────────────────────────────────────────────
    phone: { type: DataTypes.STRING, allowNull: true },
    alternate_phone: { type: DataTypes.STRING, allowNull: true },

    // ── Address ──────────────────────────────────────────
    address_line1: { type: DataTypes.STRING, allowNull: true },
    address_line2: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    postal_code: { type: DataTypes.STRING, allowNull: true },

    // ── Employment / company info ─────────────────────────
    // Fixed list, set ONLY by manager/CEO via updateEmployment
    // (see ProfileController.js + profile.routes.js). Extend this list
    // as your org adds new job titles.
    designation: {
      type: DataTypes.ENUM(
        "developer",
        "designer",
        "sales",
        "hr",
        "marketing",
        "manager",
        "ceo",
        "intern",
        "support",
        "other"
      ),
      allowNull: true,
    },
    department: { type: DataTypes.STRING, allowNull: true },
    employee_code: { type: DataTypes.STRING, allowNull: true, unique: true },
    date_of_joining: { type: DataTypes.DATEONLY, allowNull: true },
    employment_type: {
      type: DataTypes.ENUM("full_time", "part_time", "contract", "intern"),
      allowNull: true,
    },
    reporting_manager: { type: DataTypes.STRING, allowNull: true },

    // ── Emergency contact ──────────────────────────────────
    emergency_contact_name: { type: DataTypes.STRING, allowNull: true },
    emergency_contact_phone: { type: DataTypes.STRING, allowNull: true },
    emergency_contact_relation: { type: DataTypes.STRING, allowNull: true },

    // ── Social / links ──────────────────────────────────────
    linkedin_url: { type: DataTypes.STRING, allowNull: true },
    github_url: { type: DataTypes.STRING, allowNull: true },
    portfolio_url: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: "profiles", timestamps: true }
);

module.exports = Profile;