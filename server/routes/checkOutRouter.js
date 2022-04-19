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
router.get("/", getAllCheckOutProducts);

//update chekout Status
router.post("/updateStatus", updateCheckOutProducts);

export default router;
