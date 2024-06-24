import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    createdAt: String,
    updatedAt: String,
  },
  { timestamps: true }
);
const customerModel = mongoose.model("customer", customerSchema);

export default customerModel;
