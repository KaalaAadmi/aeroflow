import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SkeletonProductCard from "./SkeletonProductCard";

const RelatedProducts = ({ category, excludedId }) => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/related?category=${category}&excludeId=${excludedId}`
      );
      const data = await res.json();
      setSuggestedProducts(data.relatedProducts);
      setIsLoading(false);
    };
    fetchSuggestedProducts();
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {isLoading
            ? Array.from({ length: 3 }, (_, i) => (
                <SkeletonProductCard key={i} />
              ))
            : suggestedProducts.map((product, idx) => (
                <ProductCard
                  key={idx}
                  id={product._id}
                  name={product.name}
                  img={product.imageUrls[0].url}
                  price={product.price}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
