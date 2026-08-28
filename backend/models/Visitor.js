// models/Visitor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Visitor = sequelize.define('visitor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ip_address: {
    type: DataTypes.STRING(45),
  },
  visited_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'visitors',
  timestamps: false,
  indexes: [
    {
      name: 'visitors_visited_at',
      fields: ['visited_at'],
    },
  ],
});

module.exports = Visitor;