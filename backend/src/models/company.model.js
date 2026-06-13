import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    websiteUrl: {
      type: String,
      required: true,
      lowercase:true,
      trim: true
    },
    trustScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    riskLevel: {
      type: String,
      default: "Unknown",
      trim: true
    },
    summary: {
      type: String,
      default: "",
      trim: true
    },
    lastValidatedAt:{
    type: Date,
    default: null
    }

    
  },
  { timestamps: true },
);

const Company = mongoose.model("Company", companySchema);

export default Company;
