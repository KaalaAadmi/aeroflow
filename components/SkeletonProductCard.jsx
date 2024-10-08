import { Card, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

const SkeletonProductCard = () => {
  return (
    <Card
      // isPressable
      className="space-y-5 rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all"
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div className="h-[400px] rounded-lg bg-default-300"></div>
      </Skeleton>
      <CardFooter className="text-medium font-bold justify-between">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton className="w-1/5 rounded-lg">
          <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
        </Skeleton>
      </CardFooter>
    </Card>
  );
};

export default SkeletonProductCard;
