import mongoose from "mongoose";

let faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    qApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    answer: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    aApproved: {
      type: Boolean,
      required: true,
      default: false,
    },
    answered: {
      type: Boolean,
      required: true,
      default: false,
    },
    helpful: {
      type: Number,
      required: true,
      default: 0,
    },
    notHelpful: {
      type: Number,
      required: true,
      default: 0,
    },
    feedback: [
      {
        username: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Faq", faqSchema);
