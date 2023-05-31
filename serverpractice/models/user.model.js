const mongoose = require('mongoose');
const bcrypt=require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'a username is required']
    },
    password: {
        type: String,
        required: [true,'a username is required'],
        minLength: [5, 'pw must be 5 chars or longer']
    }
});


UserSchema.virtual("confirmPassword")
.get(() => this._confirmPassword)
.set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords Must Match");
  }
  next();
});

UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 5); //returns a promise that is the
  next();
})

const User = mongoose.model("User", UserSchema);

module.exports = User;