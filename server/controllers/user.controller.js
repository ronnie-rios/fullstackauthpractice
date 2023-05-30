const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    return res.cookie('usertoken', userToken, secret, 
    {
        httpOnly: true
    }).json({ message: "success", user: user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.username });
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
};

const logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports = {
  registerUser,
  loginUser,
  logout
};
