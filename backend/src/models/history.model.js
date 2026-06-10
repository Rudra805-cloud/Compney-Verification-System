import mongoose from "mongoose";
import User from "./user.model.js";
import Company from "./company.model.js";

const historySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        require:true
    }
},{timestamps:true})

const History= mongoose.model('History',historySchema);

export default History;