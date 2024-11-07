import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { adminAuth, authorizeAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/create", adminAuth, createProduct);
router.patch("/:id", adminAuth, updateProduct);
router.delete("/:id", adminAuth, deleteProduct);

export const productRoutes = router;
