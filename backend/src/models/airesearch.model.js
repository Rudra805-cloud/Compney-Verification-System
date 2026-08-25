import mongoose from "mongoose";

const aiResearchSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "running", "completed", "failed"],
      default: "pending",
    },

    verdict: {
      type: String,
      default: null,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Very High"],
      default: null,
    },

    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    summary: {
      type: String,
      default: null,
    },

    publicView: {
      type: String,
      default: null,
    },

    websiteAssessment: {
      type: String,
      default: null,
    },

    positiveSignals: {
      type: [String],
      default: [],
    },

    riskSignals: {
      type: [String],
      default: [],
    },

    sources: [
      {
        title: String,
        url: String,
        sourceType: String,
        publishedAt: Date,
      },
    ],

    researchedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const AIResearch = mongoose.model("AIResearch", aiResearchSchema);

export default AIResearch;