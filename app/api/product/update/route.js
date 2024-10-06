import connect from "@/lib/db";
import Product from "@/lib/models/Products";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const validImageTypes = ["image/jpeg", "image/jpg", "image/png"];

export const PUT = async (req) => {
  try {
    // Parse the form data
    const formData = await req.formData();
    const productId = formData.get("productId");
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const newImages = formData.getAll("image"); // New image files if any

    if (!productId) {
      return new NextResponse(
        JSON.stringify({ message: "Product ID is required" }),
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connect();

    // Fetch the product from MongoDB
    const product = await Product.findById(productId);
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    // If the product doesn't have an images array, initialize it
    if (!Array.isArray(product.imageUrls)) {
      product.imageUrls = [];
    }

    // If there are new image files, upload them to Cloudinary
    let uploadedImages = [];
    if (newImages && newImages.length > 0) {
      for (const image of newImages) {
        if (!validImageTypes.includes(image.type)) {
          return new NextResponse(
            JSON.stringify({ message: "Invalid image type" }),
            { status: 400 }
          );
        }

        const buffer = await image.arrayBuffer();
        const uploadResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: "auto",
                public_id: `${Date.now()}_${image.name
                  .split(".")[0]
                  .replace(/\s+/g, "_")}`,
                folder: "aeroflow/products", // Upload to the products folder
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            )
            .end(Buffer.from(buffer));
        });

        uploadedImages.push({
          key: uploadResponse.public_id,
          url: uploadResponse.secure_url,
        });
      }

      // Append new images to the existing product images
      product.imageUrls.push(...uploadedImages);
    }

    // Update the other product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    // Save the updated product back to MongoDB
    await product.save();

    return new NextResponse(
      JSON.stringify({ message: "Product updated successfully", product }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return new NextResponse(
      JSON.stringify({ message: `Error updating product: ${error.message}` }),
      { status: 500 }
    );
  }
};
