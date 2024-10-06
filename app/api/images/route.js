import connect from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connect();
  try {
    const formData = await req.formData();
    const img = formData.get("image");
    // const id = formData.get("id");
    const uploadImages = [];
    // Check if image exists in formData
    if (!img) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "No image found" }),
        { status: 400 }
      );
    }

    // Cloudinary configuration
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Convert the image to buffer
    const arrayBuffer = await img.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the image to Cloudinary and return response
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            public_id: `${Date.now()}_${img.name
              .split(".")[0]
              .split(" ")
              .join("_")}`,
            folder: "/aeroflow/images",
            // upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
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
    uploadImages.push({
      key: uploadResult.asset_id,
      url: uploadResult.secure_url,
    });
    // Return success response with the uploaded image data
    return new NextResponse(
      JSON.stringify({ uploadedImageData: uploadImages, message: "Success" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading image: ", error);
    return new NextResponse(
      JSON.stringify({ message: "Error uploading image", error }),
      { status: 500 }
    );
  }
};
