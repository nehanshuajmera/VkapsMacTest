import express from "express";
import { adminAuth, authorizeAdmin } from "../middleware/adminAuth.js";
import {
  adminSignin,
  adminSignout,
  adminSignup,
  getAdmin,
  getAllAdmins,
} from "../controllers/adminController.js";
const router = express.Router();

router.get("/", getAllAdmins);
router.get("/:id", getAdmin);
router.post("/signup", adminSignup);
router.post("/signin", adminSignin);
router.post("/signout", adminAuth, authorizeAdmin, adminSignout);
// router.patch('/:id', );
// router.delete('/:id', );

export const adminRoutes = router;