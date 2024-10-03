"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faq } from "@/data"; // Your FAQ data
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function FAQ() {
  const router = useRouter();

  // Placeholder state for input
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "How can I place an order?",
    "What is the shipping process?",
    "How does the installation work?",
    "Can I get a discount?",
  ];

  // Change the placeholder every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/contact");
  };
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <section className="relative h-3/5 bg-hero-pattern mb-8 rounded-lg">
        {/* Title Section */}
        <div className="h-[40rem] flex flex-col justify-center items-center px-4 ">
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          <div className="mb-10 sm:mb-20 flex z-10 flex-col items-center justify-center">
            <h2 className=" text-xl font-bold text-center sm:text-5xl dark:text-white text-white">
              Do You Have Questions?
            </h2>
            <p className="mt-4 text-lg text-white">
              We can answer them all hopefully{" "}
            </p>
          </div>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </section>

      {/* Main FAQ Section */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar with FAQ Segments */}
        <div className="w-full lg:w-1/3 pr-0 lg:pr-8 mb-8 lg:mb-0">
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-80px)]">
            <h2 className="text-2xl font-semibold mb-4">FAQ Segments</h2>
            <ul className="space-y-4">
              <li>
                <a href="#about-us" className="text-blue-600 hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#process" className="text-blue-600 hover:underline">
                  Process
                </a>
              </li>
              <li>
                <a href="#payment" className="text-blue-600 hover:underline">
                  Payment
                </a>
              </li>
              <li>
                <a href="#shipping" className="text-blue-600 hover:underline">
                  Shipping
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="w-full lg:w-2/3">
          <div id="about-us">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              About Us
            </h2>
            <hr className="border-t mb-8" />
            <Accordion type="single" collapsible className="w-full">
              {faq
                .filter((item) => item.segment === "about-us")
                .map((item, i) => (
                  <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>

          {/* Other FAQ sections */}
          <div id="process" className="mt-16">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">Process</h2>
            <hr className="border-t mb-8" />
            <Accordion type="single" collapsible className="w-full">
              {faq
                .filter((item) => item.segment === "process")
                .map((item, i) => (
                  <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>

          {/* Additional sections... */}
          <div id="payment" className="mt-16">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">Payment</h2>
            <hr className="border-t mb-8" />
            <Accordion type="single" collapsible className="w-full">
              {faq
                .filter((item) => item.segment === "payment")
                .map((item, i) => (
                  <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
          <div id="shipping" className="mt-16">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
              Shipping
            </h2>
            <hr className="border-t mb-8" />
            <Accordion type="single" collapsible className="w-full">
              {faq
                .filter((item) => item.segment === "shipping")
                .map((item, i) => (
                  <AccordionItem value={`item-${i}`} key={i}>
                    <AccordionTrigger>{item.title}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
// "use client";
// import React, { useState } from "react";

// const FAQ = () => {
//   // State to manage open/close of each FAQ item
//   const [openFAQ, setOpenFAQ] = useState(null);

//   // Function to toggle the visibility of FAQ details
//   const toggleFAQ = (index) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   };

//   // Dummy data for FAQs
//   const faqs = [
//     {
//       title: "What is your policy on distribution?",
//       content:
//         "Pellentesque in nisi aliquet, pellentesque purus eget, imperdiet turpis. Fusce at enim quis neque viverra convallis. Vivamus ut elementum leo, eget tempus nisl.",
//     },
//     {
//       title: "How can I contribute to Flowspark?",
//       content:
//         "Sed viverra enim ac turpis posuere consectetur. Sed enim nibh, consequat vitae lacus eu, ullamcorper ullamcorper massa.",
//     },
//     {
//       title: "What other themes do you have?",
//       content:
//         "Pellentesque purus eget, imperdiet turpis. Fusce at enim quis neque viverra convallis. Vivamus ut elementum leo, eget tempus nisl.",
//     },
//     {
//       title: "What is your policy on distribution?",
//       content:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac venenatis est, at convallis magna.",
//     },
//   ];

//   return (
//     <section>
//       <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
//         <div className="flex flex-col items-start lg:flex-row lg:space-x-20">
//           <div className="lg:flex-[1_1_500px] w-full flex-none">
//             <div className="max-w-3xl mb-8 md:mb-12 lg:mb-16">
//               <h2 className="font-bold text-3xl md:text-5xl">General FAQs</h2>
//               <div className="mt-4 max-w-lg">
//                 <p className="text-gray-500 text-sm sm:text-base">
//                   Lorem ipsum dolor sit amet consectetur adipiscing elit ut
//                   aliquam, purus sit amet luctus venenatis, lectus magna
//                   fringilla urna
//                 </p>
//               </div>
//             </div>
//             <div className="mb-6 h-full w-full overflow-auto bg-gray-100 p-8 rounded-md">
//               <div className="flex flex-row gap-4">
//                 <img
//                   src="https://via.placeholder.com/150"
//                   alt="Placeholder"
//                   className="inline-block h-12 w-12 object-cover rounded-full"
//                 />
//                 <div className="flex flex-col gap-1.5">
//                   <h5 className="text-xl font-bold">Still have questions?</h5>
//                   <div className="max-w-sm">
//                     <p className="text-gray-500 text-sm sm:text-base">
//                       Can’t find the answer you’re looking for? Please chat to
//                       our support.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="mb-6 mt-8 h-[0.5px] w-full bg-gray-300"></div>
//               <a
//                 href="#"
//                 className="inline-block items-center rounded-md bg-black px-6 py-3 text-center font-semibold text-white"
//               >
//                 Get In Touch
//               </a>
//             </div>
//           </div>
//           <div className="lg:flex-[1_1_500px] w-full flex-none">
//             {faqs.map((faq, index) => (
//               <div
//                 key={index}
//                 className="mb-6 w-full overflow-hidden bg-gray-100 p-8 rounded-md"
//               >
//                 <div
//                   className="flex cursor-pointer items-start justify-between"
//                   onClick={() => toggleFAQ(index)}
//                 >
//                   <p className="text-xl font-bold">{faq.title}</p>
//                   <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
//                     <div
//                       className={`absolute h-5 w-0.5 bg-black transition-transform duration-300 ${
//                         openFAQ === index ? "rotate-90" : ""
//                       }`}
//                     ></div>

//                     <div className="h-0.5 w-5 bg-black"></div>
//                   </div>
//                 </div>
//                 {openFAQ === index && (
//                   <div className="w-full overflow-hidden mb-4 max-w-2xl lg:max-w-4xl">
//                     <p className="text-sm sm:text-base">{faq.content}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;
