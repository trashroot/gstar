const dbConfig = require('../config/database')
const dbService = async () =>{
    try {
        await dbConfig.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = dbService
