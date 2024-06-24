import mongoose from "mongoose";
const Schema = mongoose.Schema;
const courierSchema = new Schema(
  {
    courierDesc: {
      type: String,
      require: true,
    },

    courierType: {
      type: String,
      require: true,
    },

    destinationAddress: {
      type: String,
      require: true,
    },
    returnAddress: {
      type: String,
      require: true,
    },
    courierStatus: {
      type: String,
      enum: ["processing", "shipped", "in-transit", "delivered"],
      require: true,
      default: "processing",
    },
    arrivalDate: {
      type: String,
      require: true,
    },
    courierWeight: {
      type: String,
      require: true,
    },
    courierCost: {
      type: String,
      require: true,
    },
    createdAt: String,
    updatedAt: String,
  },
  { timestamps: true }
);
const courierModel = mongoose.model("courier", courierSchema);

export default courierModel;
