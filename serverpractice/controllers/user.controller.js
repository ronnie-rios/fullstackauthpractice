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

module.exports = {
    getAllUsers
}