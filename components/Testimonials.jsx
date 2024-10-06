import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { testimonials } from "@/data";

const Testimonials = () => {
  return (
    <>
      <section className="flex justify-center">
        {/* Container */}
        <div className=" w-full  px-5 py-16 md:py-20">
          {/* Heading Container */}
          <div className="mx-auto flex max-w-3xl flex-col text-center">
            {/* Heading */}
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              What our clients are saying
            </h2>
            {/* Subheading */}
            <p className="text-sm sm:text-base">
              ElevateAI&apos;s AI-centric solutions have enabled businesses to
              scale greater heights. Here&apos;s what they have to say...
            </p>
          </div>
          {/* Contents */}
          <div className="relative mb-5 md:mb-6 lg:mb-8 w-full">
            {/* Row */}
            <div className="relative mt-12 flex flex-row justify-items-center gap-5 overflow-hidden md:gap-4">
              {/* Cards Container */}
              <InfiniteMovingCards items={testimonials} direction="left" />
            </div>
            {/* Row */}
            <div className="md:gap- relative mt-3 flex flex-row justify-items-center gap-5 overflow-hidden">
              {/* Cards Container */}
              <InfiniteMovingCards items={testimonials} />
            </div>
            {/* Bottom Margin Component */}
            {/* <div className="absolute h-full w-[5%] bg-[linear-gradient(to_right,_rgba(255,_255,_255,_0.1),_rgb(255,_255,_255))]  sm:w-[10%]"></div>
            <div className="absolute h-full w-[5%] bg-[linear-gradient(270deg,_rgba(255,_255,_255,_0.1),_rgb(255,_255,_255))]  sm:w-[10%]"></div> */}
          </div>
          {/* Button */}
          <div className="flex flex-col">
            <a href="#" className="mx-auto font-bold text-black">
              Check all reviews
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
