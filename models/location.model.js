const Sequelize = require('sequelize');
const { database } = require('../config/database');


const tableName = 'location';
const Location = database.define('Location', {
    user: {
        type: Sequelize.INTEGER,
    },
    latitude: {
        type: Sequelize.STRING,
    },
    longitude: {
        type: Sequelize.STRING,
    },
}, { tableName });

// eslint-disable-next-line
Location.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Location;
