"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Shield, X } from "lucide-react"; // Icons
import Link from "next/link";
// import { currentUser } from "@clerk/nextjs/server";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";

const Navbar = () => {
  // const [cussrentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useClerk();
  const { isSignedIn, user, isLoaded } = useUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Check if user has admin role, assuming role is stored in public metadata
  const isAdmin = isLoaded && user?.publicMetadata?.role === "admin";

  return (
    <nav className="bg-white shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-xl font-bold text-blue-600">
              <img
                src="/assets/images/AeroFlow..png"
                alt="Logo"
                className="w-46 h-8"
              />
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </a>
            <a href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
            {isSignedIn ? (
              <>
                <UserButton user={user} signOut={signOut}>
                  <UserButton.MenuItems>
                    {isAdmin && (
                      <UserButton.Action
                        label="Admin Pannel"
                        labelIcon={<Shield className="h-4 w-4" />}
                        onClick={() => {
                          window.location.href = "/admin";
                        }}
                      />
                    )}
                  </UserButton.MenuItems>
                </UserButton>
              </>
            ) : (
              <Button asChild>
                <Link href="/signin">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" onClick={toggleMenu}>
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              Products
            </a>
            <a
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              About
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              Contact
            </a>
            {/* <Button className="w-full bg-blue-600 text-white">Login</Button> */}
            <Button className="w-full" asChild>
              <Link href="/signin">Login</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
