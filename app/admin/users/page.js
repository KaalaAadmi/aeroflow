import { redirect } from "next/navigation";
import { checkRole } from "@/lib/roles";
// import { SearchUsers } from "./SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { SearchUsers } from "@/components/SearchUsers";
import { removeRole, setRole } from "../_actions";
import { Button } from "@/components/ui/button";
// import { removeRole, setRole } from "@/app/admin/_actions";

export default async function Users(params) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = params.searchParams.search;

  const users = query
    ? (await clerkClient().users.getUserList({ query })).data
    : [];

  return (
    <>
      <p className="flex justify-center mt-12">
        This is the protected admin dashboard restricted to users with the
        `admin` role.
      </p>

      <SearchUsers />

      {users.map((user) => {
        return (
          <div
            className="mx-auto max-w-7xl flex flex-col  pb-16 text-center md:px-10 md:pb-20"
            key={user.id}
          >
            <div className="flex w-full items-center justify-center">
              <div>Name: </div>
              <div>
                {" "}
                {user.firstName} {user.lastName}
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <div>Email: </div>
              <div className="">
                {
                  user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                  )?.emailAddress
                }
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <div className="">Current Role:</div>
              <div>
                {user.publicMetadata.role === null
                  ? "User"
                  : user.publicMetadata.role}
              </div>
            </div>

            <div className="flex gap-2 items-center justify-center">
              <form action={setRole} className="flex">
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <Button type="submit">Make Admin</Button>
              </form>

              <form action={setRole} className="flex">
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <Button type="submit">Make Moderator</Button>
              </form>

              <form action={removeRole} className="flex">
                <input type="hidden" value={user.id} name="id" />
                <Button type="submit">Remove Role</Button>
              </form>
            </div>
          </div>
        );
      })}
    </>
  );
}
