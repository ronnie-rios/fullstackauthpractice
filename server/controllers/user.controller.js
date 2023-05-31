const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const userToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    return res
      .cookie("usertoken", userToken, {
        httpOnly: true,
      })
      .json({ message: "success", user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (user === null) {
      return res.sendStatus(400);
    }

    const correctPw = await bcrypt.compare(req.body.password, user.password);

    if (!correctPw) {
      return res.sendStatus(400);
    }

    const userToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    res
      .cookie("usertoken", userToken, { httpOnly: true })
      .json({ msg: "success" });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("usertoken");
  res.status(200).json({ msg: 'user logged out'});
};

module.exports = {
  getAll,
  registerUser,
  loginUser,
  logout,
};
