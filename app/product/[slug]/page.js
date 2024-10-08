"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import RelatedProducts from "@/components/RelatedProducts";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const id = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/${id}`
      );
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, []);

  const mainImage = product?.imageUrls[activeImage]?.url;

  return (
    <div className="min-h-screen" style={{ minHeight: "calc(100vh - 4rem)" }}>
      {/* Ensure the container takes up the full screen height minus the navbar */}
      <div className="container mx-auto px-4 py-8 h-full flex flex-col">
        {/* Main flex container */}
        <div className="flex flex-col lg:flex-row flex-grow">
          {/* Product Images */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center mb-4">
              {mainImage && (
                <Image
                  src={mainImage}
                  alt="Product"
                  width={500}
                  height={400}
                  className="w-[500px] h-[400px] rounded-lg object-cover shadow-md"
                />
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 w-full justify-center">
              {product?.imageUrls?.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2 px-4 lg:px-8 mt-8 lg:mt-0 flex flex-col justify-evenly">
            <h2 className="text-3xl font-bold mb-2">{product?.name}</h2>
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">
                € {product?.price}
              </span>
            </div>
            <p className="text-gray-700 mb-6">{product?.description}</p>

            <div className="flex space-x-4 mb-6">
              <Button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                Enquire
              </Button>
            </div>
          </div>
        </div>
      </div>
      {product && (
        <RelatedProducts
          category={product?.category}
          excludedId={product?._id}
        />
      )}
    </div>
  );
};

export default Product;
