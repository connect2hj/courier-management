import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerSchema = new Schema({
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
});
const customerModel = mongoose.model("customer", customerSchema);

export default customerModel;
