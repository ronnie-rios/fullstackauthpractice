const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users)
    } catch (error) {
        res.status(400).json({ error: error })
    }
};

const createUser = async (req,res) => {
    try {
        const user = await User.create(req.body);
        //create a token
        const token = jwt.sign({
            //comes from the user._id from the user model
            id: user._id
        }, process.env.SECRET_KEY);

        return res.cookie('token', token, { httpOnly: true }).json({ message:'created a user', user: user})
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

module.exports = {
    getAllUsers,
    createUser
}