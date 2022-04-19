import express from "express";
import {
  createNewClient,
  getAllClientDetails,
} from "../controller/authenticationController.js";

const router = express.Router();

router.post("/", createNewClient);

router.get("/", getAllClientDetails);

export default router;
