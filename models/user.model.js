const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const { database } = require('../config/database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';
const User = database.define('User', {
    first_name: {
        type: Sequelize.STRING,
    },
    last_name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
    },
    latitude: {
      type: Sequelize.STRING,
  },
  longitude: {
      type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
},
}, { hooks, tableName });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = User;
