const userModel = require('../models/user.model')
const bcryptService = require('./bcrypt.service')
const pass = bcryptService().password({ password: '123' })

const defaultUsers = [
    {"first_name": "Luis","last_name": "Moreno","email": "luis@globalstar.com","password": 123, "latitude": null, "longitude": null, "image": "images/user.png"},
    {"first_name": "Luis-M","last_name": "Moreno","email": "moreno@globalstar.com","password": 123, "latitude": null, "longitude": null, "image": "images/user.png"},
    {"first_name": "Ankit","last_name": "Chauhan","email": "ankit@rsystems.com","password": 123, "latitude": null, "longitude": null, "image": "images/user.png"},
    {"first_name": "Ashish","last_name": "Anjan","email": "anjan@rsystems.com","password": 123, "latitude": null, "longitude": null, "image": "images/user.png"},
    {"first_name": "Ashish","last_name": "Lavanya","email": "ashish@rsystems.com","password": 123, "latitude": null, "longitude": null, "image": "images/user.png"},
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
