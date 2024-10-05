import connect from "@/lib/db";
import Product from "@/lib/models/Products";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connect();
    const products = await Product.find();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products: ", error);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching products" }),
      { status: 500 }
    );
  }
};
