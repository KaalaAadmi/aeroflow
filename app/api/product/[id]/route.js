import Product from "@/lib/models/Products";
import connect from "@/lib/db"; // Import the correct connect function
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const GET = async (req) => {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();

  // Check if the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new NextResponse(JSON.stringify({ message: "Invalid product ID" }), {
      status: 400,
    });
  }

  try {
    // Ensure connection to the database
    await connect();

    // Find the product by its ID
    const product = await Product.findById(id);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    // Return the product details
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error fetching product: ", error);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching product" }),
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();

  // Check if the id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new NextResponse(JSON.stringify({ message: "Invalid product ID" }), {
      status: 400,
    });
  }

  const body = await req.json();

  try {
    // Ensure connection to the database
    await connect();

    // Find the product by its ID and update it
    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    // Return the updated product details
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Error updating product: ", error);
    return new NextResponse(
      JSON.stringify({ message: "Error updating product" }),
      { status: 500 }
    );
  }
};
