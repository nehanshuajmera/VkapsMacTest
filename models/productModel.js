import mongoose from "mongoose";
const schema = mongoose.Schema;

const productSchema = new schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ["Electronics", "Clothes", "Books", "Home Appliances"],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);