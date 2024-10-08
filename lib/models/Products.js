import { Schema, model, models } from "mongoose";
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrls: [
      {
        key: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);

export default Product;
