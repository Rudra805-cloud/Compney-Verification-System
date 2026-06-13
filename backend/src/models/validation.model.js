import mongoose from "mongoose";


const validationSchema = new mongoose.Schema({

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },

  checks: {
    websiteExists: Boolean,
    sslEnabled: Boolean,
    contactInfoFound: Boolean,
    linkedInFound: Boolean,
    domainAgeYears: Boolean
  },

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