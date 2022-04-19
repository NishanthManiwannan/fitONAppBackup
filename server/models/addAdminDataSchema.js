import mongoose from "mongoose";

const addAdminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const adminSchema = mongoose.model("adminData", addAdminSchema);

export default adminSchema;
