import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// importing routes
import { adminRoutes } from "./routes/adminRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";

config();

const PORT = process.env.PORT;
const MDB_CONNECT = process.env.MDB_CONNECT;

const app = express();

const corsOption = {
  origin: ["http://localhost:5173",],
  Credential: true,
}

app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.status(200).json(`Backend Working, Happy Coding!`);
});

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

const connect = async () => {
  try {
    await mongoose.connect(MDB_CONNECT);
    console.log(`Connected to MongoDB`);

    app.listen(PORT, () => {
      console.log(`App is running on: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error({ message: err.message });
  }
};

connect();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Error: ${err.message}`);
})