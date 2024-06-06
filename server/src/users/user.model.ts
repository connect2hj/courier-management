import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  password: String,
  createdAt: String,
  updatedAt: String,
});
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
