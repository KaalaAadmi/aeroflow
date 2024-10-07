import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Contact from "@/lib/models/Contact";
import connect from "@/lib/db";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const validFileTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];

// Function to upload files to Cloudinary
const uploadFilesToCloudinary = async (files) => {
  const uploadedFiles = [];
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
              folder: "aeroflow/files",
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
      uploadedFiles.push(uploadResponse.secure_url);
    } else {
      throw new Error("Invalid file type");
    }
  }
  return uploadedFiles;
};

export const POST = async (req) => {
  try {
    const formData = await req.formData();

    // Extract form fields
    const userId = formData.get("userId");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const phoneNumber = formData.get("phoneNumber");
    const email = formData.get("email");
    const message = formData.get("message");
    const source = formData.get("source");
    const files = formData.getAll("file"); // Multiple files

    // Upload files to Cloudinary
    const uploadedFileUrls = await uploadFilesToCloudinary(files);

    // Save contact data to MongoDB
    await connect();
    const newContact = new Contact({
      userId,
      firstName,
      lastName,
      phoneNumber,
      email,
      message,
      source,
      fileUrls: uploadedFileUrls, // Store Cloudinary URLs
    });
    await newContact.save();

    return NextResponse.json(
      { message: "Contact saved successfully", uploadedFileUrls },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { message: "Error saving contact", error: error.message },
      { status: 500 }
    );
  }
};
