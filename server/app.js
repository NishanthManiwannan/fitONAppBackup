import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/mongoosConnect.js";
import productRoutes from "./routes/router.js";
import checkoutRoutes from "./routes/checkOutRouter.js";
import adminAuthonticationRoutes from "./routes/authonticationRoutes.js";
import authonticationRoutesClient from "./routes/authenticationClientRoutes.js";
import cors from "cors";

function createServer() {
  const app = express();

  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
  app.use(cors());

  dotenv.config();

  //connect DB
  connectDB();

  //routes
  app.use("/api/list-of-products", productRoutes);
  app.use("/api/checkout-details", checkoutRoutes);
  app.use("/api/admin-portal", adminAuthonticationRoutes);
  app.use("/api/client-portal", authonticationRoutesClient);

  return app;
}

export default createServer;
