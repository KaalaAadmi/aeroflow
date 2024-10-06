import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import { Button, buttonVariants } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { products, testimonials } from "@/data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <header>
        {" "}
        {/* Hero Container */}{" "}
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:pt-20">
          {" "}
          {/* Component */}{" "}
          <div className="mx-auto mb-8 w-full max-w-3xl text-center md:mb-12 lg:mb-16">
            {" "}
            {/* Hero Title */}{" "}
            <h1 className="mb-4 text-4xl font-bold md:text-7xl">
              {" "}
              Improve Your Indoor Air Quality{" "}
            </h1>
            <p className="mx-auto mb-5 max-w-lg text-sm text-gray-500 sm:text-xl md:mb-6 lg:mb-8">
              {" "}
              Discover advanced vantilation systems{" "}
            </p>{" "}
            {/* Hero Button */}{" "}
            <div className="flex items-stretch justify-center">
              <a
                href="/products"
                className="mr-5 inline-block rounded-md bg-black px-8 py-4 text-center font-semibold text-white md:mr-6 lg:mr-8"
              >
                {" "}
                Get Started{" "}
              </a>
              {/* <a
                href="#"
                className="flex flex-row items-center justify-center rounded-md border border-solid border-black px-6 py-3 font-bold text-black"
              >
                <img
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a944888e6cf97_PlayCircle%20(1).svg"
                  alt=""
                  className="mr-2 inline-block max-h-4 w-5"
                />
                <p className="text-sm text-black sm:text-base">Watch Demo</p>
              </a> */}
            </div>
          </div>{" "}
          {/* Hero Image */}{" "}
        </div>
        <div className="rounded-2xl p-3 md:mx-10 bg-gray-50">
          <div className="rounded-2xl max-h-[512px] overflow-hidden">
            <img
              // src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPlaceholder%20Image.svg?alt=media&token=375a1ea3-a8b6-4d63-b975-aac8d0174074"
              src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2Fbg-about.png?alt=media&token=0d5ea1c5-61cf-4b0d-beab-bd023e3d9ee8"
              // src="/assets/images/hero-1.png"
              alt="hero image"
              className="inline-block w-full object-cover "
            />
          </div>
        </div>
      </header>

      {/* Facts */}
      <section>
        {" "}
        {/* Container */}{" "}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          {" "}
          {/* Title */}{" "}
          <h2 className="mb-8 text-center text-3xl font-bold md:mb-12 md:text-5xl lg:mb-16">
            {" "}
            We get results{" "}
          </h2>{" "}
          {/* Content */}{" "}
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:gap-6">
            {" "}
            {/* Item */}{" "}
            <div className="relative p-8 md:p-10">
              <h3 className="mb-4 text-3xl font-bold md:text-5xl">1.5M</h3>
              <p className="text-sm text-gray-500">
                {" "}
                Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet
                luctus venenatis elit ut aliquam, purus sit amet luctus{" "}
              </p>
              <div className="absolute right-0 top-[29%] hidden h-2/5 border-r border-gray-300 md:block"></div>
            </div>{" "}
            {/* Item */}{" "}
            <div className="relative p-8 md:p-10">
              <h3 className="mb-4 text-3xl font-bold md:text-5xl">41%</h3>
              <p className="text-sm text-gray-500">
                {" "}
                Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet
                luctus venenatis elit ut aliquam, purus sit amet luctus{" "}
              </p>
              <div className="absolute right-0 top-[29%] hidden h-2/5 border-r border-gray-300 md:block"></div>
            </div>{" "}
            {/* Item */}{" "}
            <div className="p-8 md:p-10">
              <h3 className="mb-4 text-3xl font-bold md:text-5xl">3657+</h3>
              <p className="text-sm text-gray-500">
                {" "}
                Lorem ipsum dolor sit amet, elit ut aliquam, purus sit amet
                luctus venenatis elit ut aliquam, purus sit amet luctus{" "}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="my-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1  gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, idx) => (
            <ProductCard
              key={idx}
              id={product.id}
              name={product.name}
              img={product.image}
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
      </section>

      {/* Testimonials Section */}
      {/* <section className="my-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Clients Say
        </h2>
        <InfiniteMovingCards
          items={testimonials}
          className="-px-72 w-full"
          direction="left"
          speed="slow"
        />
        <InfiniteMovingCards
          items={testimonials}
          className="w-full"
          direction="right"
          speed="slow"
        />
      </section> */}
      <Testimonials />

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Ventilation Systems. All rights reserved.</p>
          <div className="mt-4">
            <Button variant="link" className="text-white mx-2" as Child>
              <Link href={"/privacy-policy"}>Privacy Policy</Link>
            </Button>
            <Button variant="link" className="text-white mx-2" as Child>
              <Link href="/terms">Terms & Conditions</Link>
            </Button>
          </div>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
}
