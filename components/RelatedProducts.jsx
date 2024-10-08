import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ category, excludedId }) => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  useEffect(() => {
    const fetchSuggestedProducts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/related?category=${category}&excludeId=${excludedId}`
      );
      const data = await res.json();
      setSuggestedProducts(data.relatedProducts);
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
          {suggestedProducts.map((product, idx) => (
            // <div
            //   href={`/product/${product._id}`}
            //   onClick={() => {
            //     window.location.href = `/product/${product._id}`;
            //   }}
            //   key={product.id}
            //   className="group relative"
            // >
            //   <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            //     <img
            //       alt={product.imageAlt}
            //       src={product.imageUrls[0].url}
            //       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            //     />
            //   </div>
            //   <div className="mt-4 flex justify-between">
            //     <div>
            //       <h3 className="text-sm text-gray-700">
            //         <a href={product.href}>
            //           <span aria-hidden="true" className="absolute inset-0" />
            //           {product.name}
            //         </a>
            //       </h3>
            //       <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            //     </div>
            //     <p className="text-sm font-medium text-gray-900">
            //       {product.price}
            //     </p>
            //   </div>
            // </div>
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
