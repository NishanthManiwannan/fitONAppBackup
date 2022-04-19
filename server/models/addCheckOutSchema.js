import mongoose from "mongoose";

const addProductSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  checkOutProducts: {
    type: [],
    required: true,
  },
  shippingDetails: {
    type: [],
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const productSchema = mongoose.model("checkOutProducts", addProductSchema);

export default productSchema;
