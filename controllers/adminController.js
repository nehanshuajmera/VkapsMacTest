import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// import validator from "validator";
// import bcrypt from "bcrypt";
import { Admin } from "../models/adminModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export const adminSignup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const admin = await Admin.signup(username, email, password);
    const token = createToken(admin._id, "admin");

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });
    res.status(201).json({admin: admin.username, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const adminSignin = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const admin = await Admin.signin(usernameOrEmail, password);
    const token = createToken(admin._id, "admin");

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });
    res.status(200).json({admin: admin.username, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const adminSignout = (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Signout successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Admin ID" });
    }

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
