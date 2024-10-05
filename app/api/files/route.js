// import connect from "@/lib/db";
// import { v2 as cloudinary } from "cloudinary";
// import { NextResponse } from "next/server";

// // Allowed file types
// const allowedFileTypes = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "application/pdf",
// ];

// export const POST = async (req) => {
//   await connect();
//   try {
//     const formData = await req.formData();
//     const files = formData.getAll("file"); // Get all the files
//     const id = formData.get("id");

//     // Check if files exist in formData
//     if (!files.length) {
//       return NextResponse.json(
//         { success: false, message: "No files found" },
//         { status: 400 }
//       );
//     }

//     // Cloudinary configuration
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });

//     // Process and upload each file
//     const uploadResults = await Promise.all(
//       files.map(async (file) => {
//         // Validate file type
//         if (!allowedFileTypes.includes(file.type)) {
//           throw new Error(`Invalid file format: ${file.name}`);
//         }

//         // Determine the resource type
//         const resourceType = file.type === "application/pdf" ? "raw" : "image";

//         // Convert the file to buffer
//         const arrayBuffer = await file.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
//         const respurls = [];
//         // Upload the file to Cloudinary
//         return await new Promise((resolve, reject) => {
//           const uploadStream = cloudinary.uploader.upload_stream(
//             {
//               resource_type: resourceType, // Use raw for PDFs, image for images
//               public_id: `${id}_${Date.now()}_${file.name}`,
//               folder: "/aeroflow/files", // Folder where files are stored
//             },
//             (error, result) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 result.array.forEach((re) => {
//                   respurls.push(re.secure_url);
//                 });
//                 resolve(respurls); // Only resolve the secure_url
//               }
//             }
//           );
//           // Pipe the buffer to the Cloudinary upload stream
//           uploadStream.end(buffer);
//         });
//       })
//     );

//     // Return success response with array of secure_url
//     return NextResponse.json(
//       { uploadedFilesURLs: uploadResults, message: "Success" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error uploading files: ", error);
//     return NextResponse.json(
//       { message: "Error uploading files", error },
//       { status: 500 }
//     );
//   }
// };

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
