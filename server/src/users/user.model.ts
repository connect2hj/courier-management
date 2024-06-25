import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
    currentPassword: {
      type: String,
      require: true,
    },
    createdAt: String,
    updatedAt: String,
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
