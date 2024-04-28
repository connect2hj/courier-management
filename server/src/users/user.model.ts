import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  phone: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  position: String,
  password: String,
  createdAt: String,
  updatedAt: String,
}, {
  timestamps: true
});
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
