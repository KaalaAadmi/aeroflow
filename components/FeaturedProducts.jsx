"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import Link from "next/link";
import SkeletonProductCard from "./SkeletonProductCard";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/featured`
      );
      const data = await res.json();
      setFeaturedProducts(data.featuredProducts);
      setIsLoading(false);
    };
    fetchFeaturedProducts();
  }, []);
  return (
    <section className="my-16 px-4 w-full flex justify-center">
      <div className=" flex-col w-[90vw] justify-center">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1  gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }, (_, i) => (
                <SkeletonProductCard key={i} />
              ))
            : featuredProducts.map((product, idx) => (
                <ProductCard
                  key={idx}
                  id={product._id}
                  name={product.name}
                  img={product.imageUrls[0].url}
                  price={product.price}
                  // description={product.description}
                />
              ))}
        </div>
        <div className="flex justify-center items-center">
          <Button className="mt-6  text-white px-8 py-3" as Child>
            <Link href="/products">Show More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
