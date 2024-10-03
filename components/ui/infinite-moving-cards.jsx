"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "./avatar";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "slow",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "160s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  w-screen overflow-hidden h-full", //  [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li className="mr-8 flex max-w-sm flex-col gap-6 rounded-xl border border-gray-300 bg-gray-100 p-8 sm:max-w-lg">
            <div className="flex gap-4">
              {/* <img
                // src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPLaceholder%20Image%20Secondary.svg?alt=media&token=b8276192-19ff-4dd9-8750-80bc5f7d6844"
                src={item.image}
                alt=""
                className="inline-block h-16 w-16 rounded-full object-cover"
              /> */}
              <Avatar className="overflow-auto h-16 w-16 ">
                <AvatarImage
                  src={item.image}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </Avatar>
              <div className="flex flex-col">
                <h6 className="text-base font-bold">{item.name}</h6>
                <p className="text-sm text-gray-500">{item.title}</p>
              </div>
            </div>
            <div>{item.quote}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
