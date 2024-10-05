import connect from "@/lib/db";
import Product from "@/lib/models/Products";
import { NextResponse } from "next/server";

// export const GET = async (req, res) => {
//   try {
//     await connect();
//     const products = await Product.find();
//     return new NextResponse(JSON.stringify(products), { status: 200 });
//   } catch (error) {
//     console.error("Error fetching products: ", error);
//     return new NextResponse(
//       JSON.stringify({ message: "Error fetching products" }),
//       { status: 500 }
//     );
//   }
// };

export const POST = async (req, res) => {
  const body = await req.json();
  try {
    await connect();
    const existingProduct = await Product.findOne({
      name: body.name,
      price: body.price,
    });
    if (existingProduct) {
      return new NextResponse(
        JSON.stringify({
          message: "Product already exists",
          product: existingProduct,
        }),
        { status: 409 }
      );
    }
  } catch (error) {
    console.log("Error finding product: ", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error finding product",
        error: error.message,
      }),
      { status: 500 }
    );
  }
  try {
    await connect();
    const newProduct = new Product(body);
    await newProduct.save();
    return new NextResponse(
      JSON.stringify({
        message: "New product created successfully",
        product: newProduct,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating product: ", error);
    return new NextResponse(
      JSON.stringify({
        message: "Error creating product",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
