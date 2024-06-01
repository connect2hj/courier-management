
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
    senderAddress: {
     type: String,
     require: true
    },
    destinationAddress: {
        type: String,
        require: true
    },
    returnAddress: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum:['processing', 'shipped','in-transit',"delivered"],
        required: true,
        default: 'processing'
        },
    arrivalDate: String,
    weight: {
        type: Number,
        require: true
        
    },
    cost: {
        type: Number,
        require: true
    },
    createdAt: String,
    updatedAt: String,
},{timestamps: true
}
);
const courierModel = mongoose.model("Courier", courierSchema);

export default courierModel;
