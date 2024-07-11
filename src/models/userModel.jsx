import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a valid username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: String,
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
