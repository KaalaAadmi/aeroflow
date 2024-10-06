import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connect from "@/lib/db";
import Product from "@/lib/models/Products";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const validFileTypes = ["image/jpeg", "image/jpg", "image/png"];

// Upload images to Cloudinary
const uploadImagesToCloudinary = async (files) => {
  const uploadedImages = [];
  for (const file of files) {
    if (validFileTypes.includes(file.type)) {
      const buffer = await file.arrayBuffer();
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "auto",
              public_id: `${Date.now()}_${file.name
                .split(".")[0]
                .split(" ")
                .join("_")}`,
              folder: "aeroflow/products",
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
    } else {
      throw new Error("Invalid file type");
    }
  }
  return uploadedImages;
};

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const images = formData.getAll("image"); // Get uploaded files

    // Upload images to Cloudinary
    const uploadedImageUrls = await uploadImagesToCloudinary(images);
    // Save product to MongoDB
    await connect();
    // const product = Product.findOne({ name: name, price: price });
    // if (product) {
    //   console.log(product);
    //   return new NextResponse(
    //     JSON.stringify({ message: "Product already exists" }),
    //     { status: 400 }
    //   );
    // }

    const newProduct = new Product({
      name,
      description,
      price,
      imageUrls: uploadedImageUrls,
    });
    await newProduct.save();

    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Error adding product", error: error.message },
      { status: 500 }
    );
  }
};
