import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut, Shield, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserButton = ({ user, signOut, isAdmin }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link" className="rounded-full border-none w-fit ">
            <Image
              src={user.imageUrl}
              alt="User Avatar"
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link className="flex" href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem>
                <Link className="flex " href="/admin">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ redirectUrl: "/" })}>
            {/* <div className="" onClick={() => signOut({ redirectUrl: "/" })}> */}
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            {/* </div> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserButton;
