"use client";
import MapComponent from "@/components/MapComponent";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
// import { Input } from "@/components/ui/input";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
import { House, MailOpen, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";

const Contact = () => {
  const [files, setFiles] = useState([]);
  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <>
      <section className="py-12 text-center bg-gray-50">
        <h2 className="text-4xl font-bold">CONTACT US</h2>
        {/* <p className="mt-4 text-lg">CONTACT US </p> */}
      </section>
      <section className="py-12 text-center bg-gray-50">
        <h2 className="text-4xl font-bold">We Would Love To Hear From You</h2>
        <p className="mt-4 text-lg">
          Be it a quick question or something more in-depth
        </p>
        <Button
          as
          Child
          className="mt-6 px-6 py-3" // bg-blue-600 text-white font-semibold rounded"
        >
          <Link href="#form">Contact Form</Link>
        </Button>
      </section>

      <section className="h-[50vh] w-screen">
        {/* Dublin Office */}
        <div className="h-full sm:flex-col lg:flex md:flex-row items-center justify-center lg:px-10">
          <div className="sm:h-1/2 md:h-full sm:w-full lg:w-1/2">
            {/* <MapComponent
              id="dublin-map" // Unique ID for the map
              longitude={-6.23792}
              latitude={53.47184}
            /> */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9499.316135788698!2d-6.2356557!3d53.471515499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486710d9354657b3%3A0x93dab927a3d8448b!2sOldtown%2C%20Swords%2C%20Co.%20Dublin%2C%20K67%20PT78!5e0!3m2!1sen!2sie!4v1727920572229!5m2!1sen!2sie"
              width="100%"
              height="100%"
              style={{
                Border: 0,
                borderRadius: "1rem",
                filter: "invert(90%) grayscale(1)",
              }}
              loading="lazy"
            />
          </div>
          <div className="lg:pl-20 sm:h-1/2 sm:w-full md:w-1/2 mt-4 lg:mt-0 flex flex-col justify-around">
            <h3 className="w-9/12 text-3xl font-bold flex justify-center">
              Dublin Office
            </h3>
            <div className="lg:grid lg:grid-cols-2 sm:flex sm:flex-col">
              <Link
                href={"https://maps.app.goo.gl/D4h62YRJpE9bhcoG7"}
                target="_blank"
              >
                <span className="flex items-center justify-start">
                  <House size={24} />
                  <p className="mt-2 ml-2">23, Castleview Drive, Swords</p>
                </span>
              </Link>
              <span className="flex items-center justify-start">
                <Phone size={24} />
                <p className="mt-2 ml-2">01 503 4296</p>
              </span>
              <span className="flex items-center justify-start">
                <MailOpen size={24} />
                <p className="mt-2 ml-2">sales@proair.ie</p>
              </span>
              <span className="flex items-center justify-start">
                <MapPin size={24} />
                <p className="mt-2 ml-2">Get Directions</p>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* <section id="form" className="bg-gray-100 py-12">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-6">Get In Touch</h3>
          <form className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Input type="text" label="Name" labelPlacement="outside" />
              <Input type="email" label="Email" labelPlacement="outside" />
              <Input type="tel" label="Phone Number" labelPlacement="outside" />
              <Input
                type="text"
                label="Subject/Enquiry"
                labelPlacement="outside"
              />
            </div>
            <Textarea
              className="w-full mt-6"
              label="Message"
              labelPlacement="outside"
            />

            <Select
              labelPlacement="outside"
              label="Where did you hear about us?"
              className="w-full mt-12 pt-6"
            >
              <SelectItem value="google">Google/Bing/Yahoo</SelectItem>
              <SelectItem value="social-media">Social Media</SelectItem>
              <SelectItem value="existing-customer">
                Existing Customer
              </SelectItem>
            </Select>
            {/* File Upload */}

      {/*<div className="mt-6 w-full max-w-4xl mx-auto h-4/6 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              <FileUpload onChange={handleFileUpload} />
            </div>

            <Button
              type="submit"
              className="w-full mt-6" // bg-blue-600 text-white py-4 rounded"
            >
              Submit
            </Button>
          </form>
        </div>
      </section> */}
      <section id="form">
        {" "}
        {/* Container */}{" "}
        <div className="mx-auto max-w-7xl px-5 py-16 text-center md:px-10 md:py-20">
          {" "}
          {/* Component */}{" "}
          <h2 className="text-3xl font-bold md:text-5xl">Contact Sales</h2>
          <p className="mx-auto mb-8 mt-4 max-w-lg text-gray-500 md:mb-12 lg:mb-16">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipiscing elit ut
            aliquam,purus sit amet luctus magna fringilla urna{" "}
          </p>{" "}
          {/* Form */}{" "}
          <form
            name="wf-form-name"
            method="get"
            className="mx-auto mb-4 text-left sm:px-4 md:px-20"
          >
            <div className="mb-4 grid w-full grid-cols-2 gap-6">
              <div>
                <label htmlFor="name-2" className="mb-1 font-medium">
                  {" "}
                  First Name{" "}
                </label>
                <input
                  type="text"
                  className=" block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
                  placeholder=""
                  required=""
                />
              </div>
              <div>
                <label htmlFor="name-3" className="mb-1 font-medium">
                  {" "}
                  Last Name{" "}
                </label>
                <input
                  type="text"
                  className=" block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
                  placeholder=""
                  required=""
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="field" className="mb-1 font-medium">
                {" "}
                Phone Number{" "}
              </label>
              <input
                type="tel"
                className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="field" className="mb-1 font-medium">
                {" "}
                Email{" "}
              </label>
              <input
                type="text"
                className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
              />
            </div>
            <div className="mb-5 md:mb-6 lg:mb-8">
              <label htmlFor="field" className="mb-1 font-medium">
                {" "}
                Message{" "}
              </label>
              <textarea
                placeholder=""
                maxLength="5000"
                name="field"
                className="mb-2.5 block h-auto min-h-44 w-full rounded-md border border-solid border-black px-3 py-2 text-sm text-black"
              ></textarea>
            </div>
            <div className="my-6 w-full  mx-auto h-4/6 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              <FileUpload onChange={handleFileUpload} />
            </div>
            <div className="flex items-center cursor-pointer mb-1 justify-center pb-4 md:pl-5">
              {" "}
              {/* Toggle */}{" "}
              {/* <div className="relative w-12 h-7 transition duration-200 ease-linear rounded-full bg-gray-100"> */}{" "}
              {/* Switch */}
              {/* <span className="absolute left-1 top-1 transition duration-200 ease-in-out transform bg-white rounded-full w-5 h-5" /> */}
              {/* </div> */}
              {/* <input type="checkbox" className="hidden" /> */}
              <Switch id="privacy" />
              <Label htmlFor="privacy" className="ml-2">
                By selecting this, you agree to the{" "}
                <Button variant="link" href="/privacy-policy">
                  Privacy Policy
                </Button>{" "}
                and{" "}
                <Button variant="link" href="/terms">
                  Terms & Conditions
                </Button>
              </Label>
              {/* <span
                className="ml-4 inline-block cursor-pointer text-sm max-w-48 md:max-w-full"
                htmlFor="checkbox"
              >
                {" "}
                By selecting this, you agree to the{" "}
                <a href="#"> Privacy Policy</a> and{" "}
                <a href="#">Cookie Policy</a>
              </span> */}
            </div>
            <input
              type="submit"
              value="Contact Sales"
              className="inline-block w-full rounded-md cursor-pointer bg-black px-6 py-3 text-center font-semibold text-white"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
