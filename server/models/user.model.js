const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "Username is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be 5 characters or longer"]
    }
  }, {timestamps: true});

  const User = mongoose.model("User", UserSchema);

  module.exports = User