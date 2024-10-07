import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: false,
    },
    fileUrls: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
export default Contact;
