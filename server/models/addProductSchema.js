import mongoose from "mongoose";

const addProductSchema = new mongoose.Schema({
  prodectName: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  catagory: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  prize: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  imgFile: String,
});

const productSchema = mongoose.model("products", addProductSchema);

export default productSchema;
