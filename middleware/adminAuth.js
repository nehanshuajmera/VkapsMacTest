import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";

export const adminAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies.authToken ||
      (req.header("Authorization") &&
        req.header("Authorization").split(" ")[1]);
    if (!token) {
      return res.status(401).json({
        errorMessage:
          "Access denied: No authentication token found. Please log in and try again.",
      });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(verified.id);
    if (!admin) {
      return res.status(401).json({
        errorMessage:
          "Invalid or expired token: Admin account not found. Please log in again to continue.",
      });
    }

    req.admin = { id: admin._id.toString() };
    next();
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(401).json({
      errorMessage: `Authorization error: Your session token is invalid or expired. Please log in again.`,
    });
  }
};

export const authorizeAdmin = (req, res, next) => {
  const { id } = req.params;

  if (req.admin.id !== id) {
    return res.status(403).json({
      errorMessage:
        "Permission denied: You are not authorized to perform this action on another user's account.",
    });
  }

  next();
};
