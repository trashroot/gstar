const userModel = require('../models/user.model')
const bcryptService = require('./bcrypt.service')
const pass = bcryptService().password({ password: '123' })

const defaultUsers = [
    {"first_name": "Tom","last_name": "Hank","email": "tom@abc.com","password": pass, "latitude": "123", "longitude": "456"},
    {"first_name": "Max","last_name": "Payne","email": "max@abc.com","password": pass, "latitude": "123", "longitude": "456"},
    {"first_name": "John","last_name": "Doe","email": "john@abc.com","password": pass, "latitude": "123", "longitude": "456"},
    {"first_name": "Tommy","last_name": "Maddison","email": "tommy@abc.com","password": pass, "latitude": "123", "longitude": "456"},
]

const uploadDefaultUsers = async ()=>{
    try{
        await userModel.bulkCreate(defaultUsers)        
    }catch(err){
        console.log(err);
    }
}

module.exports = uploadDefaultUsers

// uploadDefaultUsers()
