"use client";
import { FileUpload } from "@/components/ui/file-upload";

import React, { useState } from "react";

const EditProductPage = () => {
  const [files, setFiles] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const handleFileUpload = (files) => {
    setFiles(files);
    // console.log(files);
  };
  return (
    <section id="form">
      {" "}
      {/* Container */}{" "}
      <div className="mx-auto max-w-7xl px-5 py-16 text-center md:px-10 md:py-20">
        {" "}
        {/* Component */}{" "}
        <h2 className="text-3xl font-bold md:text-5xl">Edit Product</h2>
        <p className="mx-auto mb-8 mt-4 max-w-lg text-gray-500 md:mb-12 lg:mb-16">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipiscing elit ut
          aliquam,purus sit amet luctus magna fringilla urna{" "}
        </p>{" "}
        {/* Form */}{" "}
        <form
          //   onSubmit={handleSubmit(onSubmit)}
          name="wf-form-name"
          method="get"
          className="mx-auto mb-4 text-left sm:px-4 md:px-20"
        >
          {/* <div className="mb-4 grid w-full grid-cols-2 gap-6">
            
            <div>
              <label htmlFor="lname" className="mb-1 font-medium">
                {" "}
                Last Name{" "}
              </label>
              <input
                id="lname"
                // {...register("lastName", {
                //   required: "Last name is required",
                // })}
                type="text"
                className=" block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
                placeholder=""
                required=""
              />
            </div>
          </div> */}

          <div className="mb-4">
            <label htmlFor="name" className="mb-1 font-medium">
              {" "}
              Product Name{" "}
            </label>
            <input
              id="name"
              placeholder="Product Name"
              //   {...register("phoneNumber")}
              type="text"
              className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="email" className="mb-1 font-medium">
              {" "}
              Email{" "}
            </label>
            <input
              id="email"
              //   {...register("email", { required: "Email is required" })}
              type="text"
              className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
            />
          </div> */}
          <div className="mb-5 md:mb-6 lg:mb-8">
            <label htmlFor="desc" className="mb-1 font-medium">
              {" "}
              Description{" "}
            </label>
            <textarea
              id="desc"
              placeholder="Description"
              maxLength={5000}
              className="mb-2.5 block h-auto min-h-44 w-full rounded-md border border-solid border-black px-3 py-2 text-sm text-black"
              //   {...register("message", {
              //     validate: {
              //       pattern: (value) => !/[!]/.test(value),
              //     },
              //   })}
            />
          </div>
          <div>
            <label htmlFor="price" className="mb-1 font-medium">
              {" "}
              Price{" "}
            </label>
            <input
              id="price"
              placeholder="Price"
              // {...register("firstName", {
              //   required: "First name is required",
              // })}
              type="number"
              className=" block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
              required=""
            />
          </div>
          {/* <div className="mb-5 md:mb-6 lg:mb-8">
            <label htmlFor="option" className="mb-1 font-medium">
              {" "}
              Where did you hear about us?{" "}
            </label>
            <Select
              id="option"
              //   {...register("source", { required: "Source is required" })}
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
          </div> */}
          <div className="my-6 w-full  mx-auto h-4/6 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload
              onChange={handleFileUpload}
              // files={files}
              // setFiles={setFiles}
            />
          </div>
          <div className="flex items-center cursor-pointer mb-1 justify-center pb-4 md:pl-5">
            {" "}
            {/* <Switch id="privacy" />
            <Label htmlFor="privacy" className="ml-2">
              By selecting this, you agree to the{" "}
              <Button variant="link" href="/privacy-policy">
                Privacy Policy
              </Button>{" "}
              and{" "}
              <Button variant="link" href="/terms">
                Terms & Conditions
              </Button>
            </Label> */}
          </div>
          <input
            type="submit"
            value="Edit Product"
            className="inline-block w-full rounded-md cursor-pointer bg-black px-6 py-3 text-center font-semibold text-white"
            // onClick={handleSubmit}
          />
        </form>
      </div>
    </section>
  );
};

export default EditProductPage;
