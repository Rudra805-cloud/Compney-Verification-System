import mongoose from "mongoose";
import User from "./user.model.js";
import Company from "./company.model.js";

const validationSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },

  checks: Object,

  trustScore: Number,

  riskLevel: String,
  
  summary: String,

  validatedAt: {
    type: Date,
    default: Date.now
  }
});
const Validation=mongoose.model('Validation',validationSchema);
export default Validation