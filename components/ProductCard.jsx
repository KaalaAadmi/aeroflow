"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";

const ProductCard = ({ id, name, imgs, price, where }) => {
  const image_url = imgs ? imgs[0].url : "https://via.placeholder.com/500";
  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => (window.location.href = `/product/${id}`)}
      className={
        where === "products"
          ? "rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all"
          : ""
      }
    >
      <CardBody className="overflow-visible p-0 flex flex-col justify-center items-center">
        <Image
          shadow="sm"
          radius="lg"
          width="500"
          height="500"
          alt={name}
          className="h-[400px] w-full rounded-md object-cover object-top"
          src={image_url}
        />
      </CardBody>
      <CardFooter className="text-medium font-bold justify-between">
        <b>{name}</b>
        <p className="text-default-500">€ {price}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
