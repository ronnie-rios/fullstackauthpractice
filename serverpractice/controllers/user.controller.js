const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    //create a token
    const token = jwt.sign(
      {
        //comes from the user._id from the user model
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    return res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "created a user", user: user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user === null) {
      return res.status(400).json({ message: "user does not exist" });
    }

    const correctPw = await bcrypt.compare(req.body.password, user.password);
    if (!correctPw) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    res
      .cookie("token", token, { httpOnly: true })
      .json({ message: "logged in" });
  } catch (error) {
    res.status(400).json({ error: error })
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser
};
