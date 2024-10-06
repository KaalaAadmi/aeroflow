import React, { useState } from "react";
import { FileUpload } from "./ui/file-upload";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

const AddProductForm = () => {
  const [files, setFiles] = useState([]);
  const { toast } = useToast();
  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(files);
    try {
      const formData = new FormData();

      // Append form data fields to FormData object
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      files.forEach((file) => {
        formData.append("image", file);
      });

      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/add`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Product added successfully",
          description: "Woohooooooo!!!!!! It worked FINALLYYYY!!!!!!",
        });
        console.log("Product added successfully");
        console.log(result);
      } else {
        const error = await response.json();
        console.log("Error adding product: ", error.message);
        toast({
          title: "Error adding product",
          description: "error",
        });
      }
    } catch (error) {
      console.log("Error adding product: ", error);
      toast({
        title: "Error adding product",
        description: "error",
      });
    }
  };

  return (
    <section id="form">
      {" "}
      {/* Container */}{" "}
      <div className="mx-auto max-w-7xl px-5 py-16 text-center md:px-10 md:py-20">
        {" "}
        {/* Component{" "} */}
        <h2 className="text-3xl font-bold md:text-5xl">Add Product</h2>
        <p className="mx-auto mb-8 mt-4 max-w-lg text-gray-500 md:mb-12 lg:mb-16">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipiscing elit ut
          aliquam,purus sit amet luctus magna fringilla urna{" "}
        </p>{" "}
        {/* <div className="flex justify-end">
          <Button onClick={() => setActive(<ProductList />)}></Button>
        </div> */}
        {/* Form */}{" "}
        <form
          onSubmit={handleSubmit(onSubmit)}
          // name="wf-form-name"
          method="post"
          className="mx-auto mb-4 text-left sm:px-4 md:px-20"
        >
          <div className="mb-4">
            <label htmlFor="name" className="mb-1 font-medium">
              {" "}
              Product Name{" "}
            </label>
            <input
              id="name"
              placeholder="Product Name"
              {...register("name", { required: "Product name is required" })}
              type="text"
              className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
            />
          </div>
          <div className="mb-5 md:mb-6 lg:mb-8">
            <label htmlFor="desc" className="mb-1 font-medium">
              {" "}
              Description{" "}
            </label>
            <textarea
              id="desc"
              placeholder="Description"
              maxLength={3000}
              className="mb-2.5 block h-auto min-h-44 w-full rounded-md border border-solid border-black px-3 py-2 text-sm text-black"
              {...register("description", {
                validate: {
                  pattern: (value) => !/[!]/.test(value),
                },
              })}
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
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              type="number"
              className=" block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
            />
          </div>
          <div className="my-6 w-full mx-auto h-4/6 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload
              files={files}
              setFiles={setFiles}
              onChange={handleFileUpload}
            />
          </div>

          {/* <div className="flex items-center cursor-pointer mb-1 justify-center pb-4 md:pl-5"></div> */}
          <div className="flex w-full gap-2">
            {/* <Button
              variant="destructive"
              className="flex w-full rounded-md cursor-pointer px-6 py-6 text-center font-semibold text-white"
              // onClick={onCancel}
            >
              Cancel
            </Button> */}
            <Button
              // variant="outline"
              className=" w-full rounded-md flex items-center cursor-pointer bg-black px-6 py-6 text-center font-semibold text-white"
              // onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProductForm;
