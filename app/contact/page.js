"use client";
// import MapComponent from "@/components/MapComponent";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
// import { Input } from "@nextui-org/input";
// import { Textarea } from "@nextui-org/input";
// import {  } from "@nextui-org/select";

import { Label } from "@/components/ui/label";
import { Form, useForm } from "react-hook-form";
import axios from "axios";

import { ChevronsUpDown, House, MailOpen, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const [files, setFiles] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const handleFileUpload = (files) => {
    setFiles(files);
    // console.log(files);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append form fields to FormData
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("email", data.email);
      formData.append("message", data.message);
      formData.append("source", data.source);

      // Append each file to FormData
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }
      console.log(formData);
      // Make the API request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/contact`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Contact saved successfully");
        console.log(result);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred while submitting the form");
    }
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
          <Form
            api={`${process.env.NEXT_PUBLIC_URL}/api/contact`}
            onSubmit={handleSubmit(onSubmit)}
            onSuccess={() => {
              alert("SUCCESS");
            }} // valid response
            control={control}
            onError={(err) => {
              alert("ERROR: ", err);
            }} // error response
            validateStatus={(status) => status >= 200}
            // name="wf-form-name"
            method="post"
            className="mx-auto mb-4 text-left sm:px-4 md:px-20"
          >
            <div className="mb-4 grid w-full grid-cols-2 gap-6">
              <div>
                <label htmlFor="fname" className="mb-1 font-medium">
                  {" "}
                  First Name{" "}
                </label>
                <input
                  id="fname"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  type="text"
                  className=" block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
                  placeholder=""
                  required=""
                />
              </div>
              <div>
                <label htmlFor="lname" className="mb-1 font-medium">
                  {" "}
                  Last Name{" "}
                </label>
                <input
                  id="lname"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  type="text"
                  className=" block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
                  placeholder=""
                  required=""
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="tel" className="mb-1 font-medium">
                {" "}
                Phone Number{" "}
              </label>
              <input
                id="tel"
                {...register("phoneNumber")}
                type="tel"
                className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1 font-medium">
                {" "}
                Email{" "}
              </label>
              <input
                id="email"
                {...register("email", { required: "Email is required" })}
                type="text"
                className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
              />
            </div>
            <div className="mb-5 md:mb-6 lg:mb-8">
              <label htmlFor="message" className="mb-1 font-medium">
                {" "}
                Message{" "}
              </label>
              <textarea
                id="message"
                placeholder="Message"
                maxLength={5000}
                className="mb-2.5 block h-auto min-h-44 w-full rounded-md border border-solid border-black px-3 py-2 text-sm text-black"
                {...register("message", {
                  validate: {
                    pattern: (value) => !/[!]/.test(value),
                  },
                })}
              />
              {/* <textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                placeholder=""
                maxLength="5000"
                name="field"
                className="mb-2.5 block h-auto min-h-44 w-full rounded-md border border-solid border-black px-3 py-2 text-sm text-black"
              ></textarea> */}
            </div>
            <div className="mb-5 md:mb-6 lg:mb-8">
              <label htmlFor="option" className="mb-1 font-medium">
                {" "}
                Where did you hear about us?{" "}
              </label>
              <Select
                id="option"
                {...register("source", { required: "Source is required" })}
                className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Web</SelectLabel>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="bing">Bing</SelectItem>
                    <SelectItem value="yahoo">Yahoo</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Social Media</SelectLabel>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Other</SelectLabel>
                    <SelectItem value="existing-customer">
                      Existing Customer
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="my-6 w-full  mx-auto h-4/6 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              <FileUpload
                onChange={handleFileUpload}
                // files={files}
                // setFiles={setFiles}
              />
            </div>
            <div className="flex items-center cursor-pointer mb-1 justify-center pb-4 md:pl-5">
              {" "}
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
            </div>
            <input
              type="submit"
              value="Contact Sales"
              className="inline-block w-full rounded-md cursor-pointer bg-black px-6 py-3 text-center font-semibold text-white"
              onClick={handleSubmit}
            />
          </Form>
        </div>
      </section>
    </>
  );
};

export default Contact;
