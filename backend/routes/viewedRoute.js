import express from "express";
import { ViewProduct } from "../models/viewProduct.js";
import { trackViewed, getViewedProducts } from "./viewedAuth.js";
import { userAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/track-viewed-product", userAuth, trackViewed);
router.get("/viewed-products", userAuth, getViewedProducts);

export default router;