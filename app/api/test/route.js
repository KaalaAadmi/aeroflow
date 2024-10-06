// import { NextResponse } from "next/server";

// export const POST = async (req) => {
//   try {
//     const formData = await req.formData();
//     const name = formData.get("name"); // Get the name field
//     const description = formData.get("description"); // Get the description field

//     console.log({ name, description }); // Log the received data

//     return NextResponse.json(
//       { message: "Form data received", name, description },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error parsing form data:", error);
//     return NextResponse.json(
//       { message: "Error parsing form data", error: error.message },
//       { status: 500 }
//     );
//   }
// };

import { NextResponse } from "next/server";
import Product from "@/lib/models/Products";
import connect from "@/lib/db";

// API route to handle product addition
export const POST = async (req) => {
  try {
    const formData = await req.formData(); // Attempt to parse FormData

    // Extract fields from FormData
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const files = formData.getAll("file"); // Use getAll for file uploads

    console.log({ name, description, price, files }); // Log to check values

    // Construct product data
    // const productData = {
    //   name,
    //   description,
    //   price: parseFloat(price), // Ensure price is a number
    //   images: images.map((image) => ({ url: image }, { key: image.name })), // Handle images appropriately
    // };

    // Connect to database and save the product
    // await connect();
    // const newProduct = new Product(productData);
    // await newProduct.save();

    return NextResponse.json(
      { message: "Product added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Error adding product", error: error.message },
      { status: 500 }
    );
  }
};
