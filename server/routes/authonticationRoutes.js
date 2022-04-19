import express from "express";
import {
  createNewAdmin,
  getAllAdminDetails,
} from "../controller/authenticationController.js";

const router = express.Router();

router.post("/", createNewAdmin);

router.get("/", getAllAdminDetails);

export default router;
