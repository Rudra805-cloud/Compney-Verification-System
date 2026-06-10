import mongoose, { Types } from "mongoose";
import Company from "./company.model";

const validationSchema=new mongoose.Schema({
    companyId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Company",
            required:true
        },
    checkName:{
        type:String,
        unique:true,
        required:true,
    },
    status:{
        type: String,
        enum: ["PASS", "FAIL"],
        required: true
    },
    message:{
        type:String,
        required:true
    }
})

const ValidationCheck=mongoose.model('ValidationCheck',validationSchema);

export default ValidationCheck;