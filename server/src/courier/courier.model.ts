import mongoose from "mongoose";
const Schema = mongoose.Schema;
const courierSchema = new Schema({

    courierDesc:{ 
        type: String,
        require: true,
    },
    
    courierType: {
        type: String,
        require: true
    },
    senderAddress: String,
    destinationAddress: String,
    returnAddress: String,
    status: String,
    arrivalDate: String,
    weight: String,
    cost: String,
    createdAt: String,
    updatedAt: String,
});
const courierModel = mongoose.model("Courier", courierSchema);

export default courierModel;
