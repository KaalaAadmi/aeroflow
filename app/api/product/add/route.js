import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import Product from "@/lib/models/Products";
import connect from "@/lib/db";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Disable Next.js body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to upload file to Cloudinary
const uploadFileToCloudinary = async (buffer, fileName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        public_id: `aeroflow/${fileName}`,
        folder: "/aeroflow/images",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
    uploadStream.end(buffer); // Pipe buffer to Cloudinary
  });
};

// Helper function to handle Multer file upload and wrap in a Promise
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export const POST = async (req, res) => {
  try {
    // Use the Multer middleware
    await runMiddleware(req, res, upload.single("image"));

    // Check if file exists
    if (!req.file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Extract form fields from `req.body`
    const { name, price, description } = req.body;

    // Upload file to Cloudinary
    const uploadedImageUrl = await uploadFileToCloudinary(
      req.file.buffer, // Use buffer from multer
      req.file.originalname
    );

    // Save product to MongoDB
    await connect(); // Ensure your MongoDB connection
    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl: uploadedImageUrl, // Cloudinary URL
    });

    await newProduct.save();

    return NextResponse.json(
      { message: "Product saved successfully", newProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json(
      { message: "Error saving product", error: error.message },
      { status: 500 }
    );
  }
};
