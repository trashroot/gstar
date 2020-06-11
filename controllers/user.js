const userModel = require('../models/user.model')
const locationModel = require('../models/location.model')
const bcryptService = require('../services/bcrypt.service')
const authService = require('../services/auth.service')

const user = {
    login: async function (req, res) {
        const { email, password } = req.body;
        
        if (email && password) {
            try {
                const user = await userModel
                .findOne({
                    where: {
                        email: email,
                    },
                });

                if (!user) {
                    return res.status(400).json({ msg: 'Bad Request: User not found' });
                }

                if (bcryptService().comparePassword(password, user.password)) {
                    const token = authService().issue({ id: user.id });
                    return res.status(200).json({ token, user });
                }

                    return res.status(401).json({ msg: 'Unauthorized' });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }
        }
        return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
    },
    
    logout: function (req, res) {
        res.send("Logout working")
    },

    register: async function (req, res) {
        const { body } = req;
        // console.log(req);
            
        if (body.password === body.password2) {
        try {
            const user = await userModel.create({
            first_name: body.first_name, 
            last_name: body.last_name, 
            email: body.email,
            password: body.password,
            });        
            const token = authService().issue({ id: user.id });        
            return res.status(200).json({ token, user });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
        }
        return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
    },

    getAllUsers: async function (req, res) {
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
        return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
    },
    getLocation: async function (req, res) {        
        const user  = req.params.user;
        
        if (user) {
            try {
                const location = await locationModel
                .findOne({
                    where: {
                        user: user,
                    },
                    order: [ [ 'createdAt', 'DESC' ]]
                });

                if (!user) {
                    return res.status(400).json({ msg: 'Bad Request: User not found' });
                }
                return res.status(200).json({ location });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }
        }
        return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
    },

    travelHistory: async function (req, res) {
        const user  = req.params.user;
                
        if (user) {
            try {
                const location = await locationModel
                .findAll();

                if (!user) {
                    return res.status(400).json({ msg: 'Bad Request: User not found' });
                }
                return res.status(200).json({ location });
            } catch (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Internal server error' });
            }
        }
        return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
    }
}

module.exports = user;