const User = require('../models/user.model');

const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.json({ message:'success', user: user});
    } catch (error) {
        res.status(500).json({ error: error })
    }
}


module.exports={
    registerUser
}