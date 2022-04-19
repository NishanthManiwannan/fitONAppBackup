import express from "express";
import { async } from "regenerator-runtime";
import {
  getAllProducts,
  getProductById,
  createNewProducts,
  deleteProductData,
  updateProduct,
  getProductBySearch,
} from "../controller/productsController.js";
const router = express.Router();

//add new products
router.post("/", createNewProducts);

//get all product
router.get("/", async function (req, res) {
  try {
    const allProducts = await getAllProducts();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//get product by id
router.get("/:id", async function (req, res, id) {
  try {
    const product = await getProductById(req, id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//delete product
router.delete("/:id", deleteProductData);

//update product
router.patch("/:id", updateProduct);

//search product
router.get("/product/:search", getProductBySearch);

export default router;
