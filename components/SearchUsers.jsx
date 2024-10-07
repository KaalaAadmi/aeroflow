"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 text-center md:px-10 md:py-20">
      <h2 className="text-3xl font-bold md:text-5xl">Modify Users</h2>
      <p className="mx-auto mb-8 mt-4 max-w-lg text-gray-500 md:mb-12 lg:mb-16">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam,purus
        sit amet luctus magna fringilla urna{" "}
      </p>{" "}
      <form
        className="mx-auto mb-4 text-left sm:px-4 md:px-20"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search");
          //   if (queryTerm === "") {
          //     const response = await clerkClient.users.getUserList();
          //   }
          router.push(pathname + "?search=" + queryTerm);
        }}
      >
        <div className="mb-4">
          <label htmlFor="tel" className="mb-1 font-medium">
            {" "}
            Search for Users{" "}
          </label>
          <input
            id="search"
            name="search"
            // {...register("phoneNumber")}
            type="text"
            className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
          />
          <Button className="flex w-full rounded-md px-6 py-6 text-center font-semibold text-white">
            Submit
          </Button>
        </div>
        {/* <label htmlFor="search">Search for Users</label>
        <input id="search" name="search" type="text" />
        <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};
