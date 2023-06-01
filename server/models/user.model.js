const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [5, "Password must be 5 characters or longer"],
    },
    notes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }]
  },
  { timestamps: true }
);


UserSchema.virtual("confirmPassword")
.get(() => this._confirmPassword)
.set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords Must Match");
  }
  next();
});
//forgot the return with the arrow func
UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 7); //returns a promise that is the
  next();
})
// this scope acts weird with arrow functions so its not pointing to the user.pw, don't use an arrow
// UserSchema.pre('save', async (next) => {
//   UserSchema.password = await bcrypt.hash(UserSchema.password, 7); //returns a promise that is the
//   next();
// })

// UserSchema.pre('save', function(next) {
//   bcrypt.hash(this.password, 7)
//     .then(hash => {
//       this.password = hash;
//       next();
//     });
// });

const User = mongoose.model("User", UserSchema);

module.exports = User;