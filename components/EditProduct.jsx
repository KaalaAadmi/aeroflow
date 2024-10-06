"use client";
import React, { useState, useEffect } from "react";
import { FileUpload } from "./ui/file-upload";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const EditProduct = ({ product }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [images, setImages] = useState(product.imageUrls);
  const [files, setFiles] = useState([]);
  const { toast } = useToast();
  const router = useRouter();
  const handleOpenModal = (e) => {
    e.preventDefault();
    onOpen();
  };
  const handleFileUpload = (files) => {
    setFiles(files);
    // console.log(files);
  };
  // console.log(images);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("imageUrls", product.imageUrls);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append product fields to formData
    formData.append("productId", product._id); // Ensure the product ID is passed

    const updates = [];
    // Check if each field has been changed and append to formData and updates array
    if (data.name !== product.name) {
      formData.append("name", data.name);
      updates.push(`Name: ${data.name}`);
    }

    if (data.description !== product.description) {
      formData.append("description", data.description);
      updates.push(`Description: ${data.description}`);
    }

    if (data.price !== product.price) {
      formData.append("price", data.price);
      updates.push(`Price: $${data.price}`);
    }

    // Append new image files if any
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("image", file);
        updates.push(`Image(s) uploaded`); // Indicate new images uploaded
      });
    }
    // formData.append("name", data.name);
    // formData.append("description", data.description);
    // formData.append("price", data.price);

    // // Append new image files if any
    // if (files && files.length > 0) {
    //   files.forEach((file) => {
    //     formData.append("image", file);
    //   });
    // }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      // Send PUT request to update product
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/update`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Product updated successfully:", result);
        // Update the images state with the new URLs
        if (result.product && result.product.imageUrls) {
          setImages(result.product.imageUrls);
        }
        // Create a detailed description for the toast message
        const updateDescription =
          updates.length > 0 ? updates.join(", ") : "No changes made.";
        toast({
          title: "Product updated successfully",
          description: updateDescription,
        });
      } else {
        console.error("Error updating product:", result.message);
        toast({
          title: "Error updating product",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteImage = async (imageAssetId, productId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/product/remove-image`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageAssetId, productId }),
        }
      );

      const dataResponse = await response.json();
      if (response.ok) {
        console.log(dataResponse); // Success message

        // Instead of setting images from the response, filter out the deleted image from the current images
        const updatedImages = images.filter(
          (image) => image.key !== imageAssetId
        );
        setImages(updatedImages); // Update the state without re-adding

        // Optionally reset files after successful submission
        setFiles([]);
        toast({
          title: "Image deleted successfully",
          description: "Image deleted successfully",
        });
      } else {
        console.error(dataResponse.message); // Error message
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section id="form">
      {" "}
      {/* Container */}{" "}
      <div className="mx-auto max-w-7xl px-5 py-16 text-center md:px-10 md:py-20">
        {" "}
        {/* Component{" "} */}
        <h2 className="text-3xl font-bold md:text-5xl">Edit Product</h2>
        <p className="mx-auto mb-8 mt-4 max-w-lg text-gray-500 md:mb-12 lg:mb-16">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipiscing elit ut
          aliquam,purus sit amet luctus magna fringilla urna{" "}
        </p>{" "}
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
              // value={product.name}
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
              // value={product.description}
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
              // value={product.price}
              placeholder="Price"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              type="number"
              step="0.01"
              className=" block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
              required=""
            />
          </div>
          <div className="my-6 w-full mx-auto h-4/6 bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-2">
              {images &&
                images.length > 0 &&
                images.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative h-40 sm:h-60 lg:h-80 group"
                  >
                    <img
                      src={image.url}
                      alt=""
                      className="object-cover w-full h-full rounded-lg"
                    />
                    {/* Overlay when hovered */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg group-hover:opacity-40 transition-opacity"></div>
                    {/* "Change" text visible on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-semibold text-lg">
                        <Button
                          variant="link"
                          className="w-full"
                          onClick={() =>
                            handleDeleteImage(image.key, product._id)
                          } // Add onClick event here
                        >
                          <Trash className="h-8 w-8 text-white" />
                        </Button>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex w-full items-center justify-center pt-6">
              <Button
                className="flex w-full rounded-md cursor-pointer px-6 py-6 text-center font-semibold text-white"
                onClick={handleOpenModal}
              >
                Add Images
              </Button>
            </div>
            <Modal
              placement="auto"
              backdrop="blur"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Upload Images
                    </ModalHeader>
                    <ModalBody>
                      <div className="relative w-full mt-10 max-w-xl mx-auto">
                        <FileUpload
                          onChange={handleFileUpload}
                          files={files}
                          setFiles={setFiles}
                        />
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="destructive" onClick={onClose}>
                        Close
                      </Button>
                      {/* TODO: add onclick and make api call to upload image and get secure_url(s) to add in mongodb */}
                      {/* <Button color="primary">Upload</Button> */}
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>

          {/* <div className="flex items-center cursor-pointer mb-1 justify-center pb-4 md:pl-5"></div> */}
          <div className="flex w-full gap-2">
            <Button
              variant="destructive"
              className="flex w-full rounded-md cursor-pointer px-6 py-6 text-center font-semibold text-white"
              // onClick={onCancel}
            >
              Cancel
            </Button>
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

export default EditProduct;

const PlaneIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
    </svg>
  );
};

const VacationIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
      <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
      <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
      <path d="M15 9l-3 5.196" />
      <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
    </svg>
  );
};

const ElevatorIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
      <path d="M10 10l2 -2l2 2" />
      <path d="M10 14l2 2l2 -2" />
    </svg>
  );
};

const FoodIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
    </svg>
  );
};

const MicIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
      <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
    </svg>
  );
};

const ParachuteIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M22 12a10 10 0 1 0 -20 0" />
      <path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
      <path d="M2 12l10 10l-3.5 -10" />
      <path d="M15.5 12l-3.5 10l10 -10" />
    </svg>
  );
};
