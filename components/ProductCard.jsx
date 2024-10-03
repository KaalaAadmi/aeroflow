"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Image from "next/image";

const ProductCard = ({ id, name, img, price, where }) => {
  return (
    <Card
      shadow="sm"
      isPressable
      onPress={() => (window.location.href = `/product/${id}`)}
      className={where === "products" ? "h-full" : ""}
    >
      <CardBody className="overflow-visible p-0 flex flex-col justify-center">
        <Image
          shadow="sm"
          radius="lg"
          width="500"
          height="500"
          alt={name}
          className="w-full object-cover" // h-[300px]"
          src={img}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{name}</b>
        <p className="text-default-500">{price}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
