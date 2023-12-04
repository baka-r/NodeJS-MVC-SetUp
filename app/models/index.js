const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require('../configs/connection.js');

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./users')(sequelize, DataTypes);


// Define associations between models

module.exports = db;