"use client";
import ProductCard from "@/components/ProductCard";
import { allproducts } from "@/data";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product/all`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <>
      <section className="w-full flex justify-center py-4">
        <div className="w-[95%] ">
          <h3 className="text-4xl font-extrabold text-gray-800 mb-12">
            Available Products{" "}
          </h3>
          <div className="grid w-full items-center justiify-center lg:grid-cols-4 gap-4 sm:grid-cols-1 sm:gap-3 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                imgs={product.imageUrls}
                price={product.price}
                // description={product.description}
                where="products"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
