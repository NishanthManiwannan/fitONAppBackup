import express from "express";
import {
  getAllProducts,
  getProductById,
  createNewProducts,
  updateProduct,
  deleteProductData
} from "../controller/productsController.js";
const router = express.Router();

//add new products
router.post('/', createNewProducts)

//get all product
router.get("/", getAllProducts);

//get product by id
router.get("/:id", getProductById);

//Update product
router.patch("/:id", updateProduct);

//Delete product
router.delete("/:id", deleteProductData);

export default router;
