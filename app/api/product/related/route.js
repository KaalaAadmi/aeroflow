// File: /pages/api/product/related.js

import connect from "@/lib/db";
import Product from "@/lib/models/Products";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  //   const { category, excludeId } = req.query; // Get categories and the product to exclude from the query
  const url = new URL(req.url);
  const search_params = url.searchParams;
  const category = search_params.get("category");
  const excludeId = search_params.get("excludeId");
  try {
    await connect(); // Connect to the database

    // Find products with at least one matching category, excluding the current product by its ID
    const relatedProducts = await Product.find({
      category: { $in: category }, // Use $in to find products with any matching categories
      _id: { $ne: excludeId }, // Exclude the current product
    }).limit(8); // Limit to 8 or any number you prefer

    return new NextResponse(
      JSON.stringify({ success: true, relatedProducts }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching related products:", error);

    return new NextResponse(
      JSON.stringify({ success: false, message: "Server Error" }),
      { status: 500 }
    );
  }
};
//   try {
//     await connect(); // Connect to the database

//     // Find products with at least one matching category, excluding the current product by its ID
//     const relatedProducts = await Product.find({
//       category: { $in: category }, // Use $in to find products with any matching categories
//       _id: { $ne: excludeId }, // Exclude the current product
//     })
//       .sort({ updatedAt: -1 }) // Sort by most recently updated products
//       .limit(8); // Limit to 8 or any number you prefer

//     return new NextResponse(
//       JSON.stringify({ success: true, relatedProducts }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching related products:", error);

//     return new NextResponse(
//       JSON.stringify({ success: false, message: "Server Error" }),
//       { status: 500 }
//     );
//   }
// };
