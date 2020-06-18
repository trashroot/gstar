const userModel = require('../models/user.model')
const locationModel = require('../models/location.model')
const bcryptService = require('../services/bcrypt.service')
const authService = require('../services/auth.service')
const { Op } = require("sequelize");

const user = {
    login: async function (req, res) {
        const { email, password } = req.body;
        var err_response = 
        {   
            msg: 'Unknown error. Please try again',
            token: null,
            user: {
                id: null,
                first_name: null, 
                last_name: null, 
                email: null,
                latitude: null,
                longitude: null,
                createdAt: null,
                updatedAt: null,
            }            
        }
        if (email && password) {
            try {
                const user = await userModel
                .findOne({
                    where: {
                        email: email,
                    },
                });               

                if (!user) {
                    err_response.msg = 'User not found'
                    return res.status(400).json(err_response);
                }

                if (bcryptService().comparePassword(password, user.password)) {
                    const token = authService().issue({ id: user.id });
                    return res.status(200).json({ 'msg': 'success', token, user });
                }
                err_response.msg = 'Unauthorized'
                return res.status(401).json( err_response );
            } catch (err) {
                err_response.msg = 'Internal server error'
                return res.status(500).json(err_response);
            }
        }
        err_response.msg = 'Email or password is wrong';
        return res.status(400).json( err_response );
    },
    
    logout: function (req, res) {
        var response = 
        {   
            msg: 'logout',
            token: null,
            user: {
                id: null,
                first_name: null, 
                last_name: null,
                email: null,
                latitude: null,
                longitude: null,
                createdAt: null,
                updatedAt: null,
            }            
        }
        return res.status(200).json(response);
    },

    register: async function (req, res) {
        const { body } = req;
        var erro_message = 
        {   
            msg: 'Unknown error. Please try again',
            token: null,
            user: {
                id: null,
                first_name: null, 
                last_name: null, 
                email: null,
                latitude: null,
                longitude: null,
                image: null,
                createdAt: null,
                updatedAt: null,
            }            
        }
            
        if (body.password === body.password2) {
            try {
                const user = await userModel.create({
                    first_name: body.first_name, 
                    last_name: body.last_name, 
                    email: body.email,
                    password: body.password,
                    latitude: body.latitude,
                    longitude: body.longitude,
                    image: body.image
                });        
                const token = authService().issue({ id: user.id });
                user.longitude = null
                user.latitude = null
                return res.status(200).json({ msg: 'success',token, user });
            } catch (err) {
                if(err.errors[0].type == 'unique violation'){
                    erro_message.msg = 'Email already exist';
                }
                return res.status(500).json(erro_message);
            }
        }
        erro_message.msg = 'Passwords don\'t match';
        return res.status(400).json(erro_message);
    },

    getAllUsers: async function (req, res) {
        const { id } = req.token;
                
        if(!id){
            return res.status(200).json({ msg: 'Invalid token' });
        }

        try {
            const users = await userModel.findAll({
                where:{
                    id: {
                        [Op.ne]: id
                    }
                }
            });        
            return res.status(200).json({ users });
        } catch (err) {
            console.log(err);
            
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },
    getAllUsersForDash: async function (req, res) {
        try {
            const users = await userModel.findAll();        
            return res.status(200).json({ users });
        } catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },
    saveLocation: async function (req, res) {
        const { user, latitude, longitude } = req.body;
            
        if (user && (latitude || longitude)) {
        try {
            await userModel.update({ latitude: latitude, longitude: longitude }, {
                where: {
                    id: user
                }
            });

            const location = await locationModel.create({
                user: user, 
                latitude: latitude,
                longitude: longitude,
            });            
            return res.status(200).json({ location });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
        }
        return res.status(400).json({ msg: 'Unknown error' });
    },
    getLocation: async function (req, res) {        
        const user  = req.params.user;
        
        if (user) {
            try {
                const location = await userModel
                .findOne({
                    where: {
                        id: user,
                    },
                    order: [ [ 'createdAt', 'DESC' ]]
                });

                if (!user) {
                    return res.status(400).json({ msg: 'User not found' });
                }
                return res.status(200).json({ location });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }
        }
        return res.status(400).json({ msg: 'Unknown error' });
    },

    travelHistory: async function (req, res) {
        const user  = req.params.user;
                
        if (user) {
            try {
                const location = await locationModel
                .findAll({
                    where: {
                        user: user,                        
                        createdAt: {
                            [Op.lt]: new Date(),
                            [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
                        }
                        
                    }
                });

                if (!user) {
                    return res.status(400).json({ msg: 'User not found' });
                }
                return res.status(200).json({ location });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }
        }
        return res.status(400).json({ msg: 'Unknown error' });
    }
}

module.exports = user;