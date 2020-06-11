/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const path = require('path');
const connection = require('./config');

let database;

switch (process.env.NODE_ENV) {
  case 'production':
    database = new Sequelize(
      connection.db.production.database,
      connection.db.production.username,
      connection.db.production.password, {
        host: connection.db.production.host,
        dialect: connection.db.production.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      },
    );
    break;  
  default:
    database = new Sequelize(      
      {
        dialect: connection.db.development.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
      },
    );
}

const dbConnection = async ()=> {
  try {
    await database.authenticate()
    await database.sync({force: true})
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  database,
  dbConnection
}
