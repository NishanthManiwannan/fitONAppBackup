import express from "express";
import {
  createNewCheckOut,
  getAllCheckOutProducts,
  updateCheckOutProducts,
} from "../controller/checkOutController.js";
const router = express.Router();

//add new checkout products
router.post("/", createNewCheckOut);

//get checkout details
router.get("/", async function (req, res) {
  try {
    const allCheckoutData = await getAllCheckOutProducts();
    res.status(200).json(allCheckoutData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//update chekout Status
router.post("/updateStatus", updateCheckOutProducts);

export default router;
