"use client";
import React, { useState, useEffect } from "react";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconTag,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

import ProductTable from "@/components/ProductTable";
import { Button } from "@/components/ui/button";
import axios from "axios";
import EditProduct from "@/components/EditProduct";

export default function Admin() {
  const [editingProduct, setEditingProduct] = useState(null);
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveComponent(
      <EditProduct product={product} onSave={handleSaveChanges} />
    );
  };

  const handleSaveChanges = async () => {
    setActiveComponent(<ProductList onEdit={handleEditProduct} />);
  };
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <Dashboard />,
    },
    {
      label: "Products",
      href: "#",
      icon: (
        <IconTag className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <ProductList />,
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <Settings />,
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <Logout />,
    },
  ];

  const [active, setActive] = useState(<Dashboard />);
  const [open, setOpen] = useState(false);

  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center">
        <div
          className={cn(
            "rounded-md flex h-screen bg-gray-100 dark:bg-neutral-800 w-full mx-auto border border-neutral-200 dark:border-neutral-700"
          )}
        >
          {/* Sidebar - fixed width and positioned */}
          <div className="w-64 flex-shrink-0 bg-white dark:bg-neutral-900 h-screen overflow-y-auto border-r border-neutral-200 dark:border-neutral-700">
            <Sidebar open={open} setOpen={setOpen} animate={false}>
              <SidebarBody className="justify-between gap-10">
                <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                  <>
                    <Logo />
                  </>
                  <div className="mt-8 flex flex-col gap-2">
                    {links.map((link, idx) => (
                      <SidebarLink
                        onClick={() => setActive(link.component)}
                        key={idx}
                        link={link}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <SidebarLink
                    link={{
                      label: "Manu Arora",
                      href: "#",
                      icon: (
                        <Image
                          src="/assets/images/avatar.png"
                          className="h-7 w-7 flex-shrink-0 rounded-full"
                          width={50}
                          height={50}
                          alt="Avatar"
                        />
                      ),
                    }}
                  />
                </div>
              </SidebarBody>
            </Sidebar>
          </div>

          {/* Right content - scrollable */}
          <div className="flex-1 overflow-y-auto">
            {active} {/* This will display the selected component */}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Aero Flow
      </motion.span>
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ setActiveComponent }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/api/product/all`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product); // Set the product to be edited
  };

  const handleSaveChanges = async (updatedProduct) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/product/${updatedProduct._id}`,
        updatedProduct
      );
      setEditingProduct(null); // Exit edit mode after saving
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/product/all`
      );
      setProducts(res.data); // Fetch updated data
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        {editingProduct ? (
          <EditProduct
            setActive={setActiveComponent}
            product={editingProduct}
            onSave={handleSaveChanges}
            onCancel={() => setEditingProduct(null)}
          />
        ) : (
          <>
            <div className="flex">
              <div className="flex-1">
                <h1 className="text-2xl font-semibold">Product List</h1>
              </div>
            </div>
            <div className="container mx-auto py-10">
              <ProductTable data={products} onEdit={handleEdit} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Dummy AddProduct component
const AddProduct = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        {/* Add product form */}
      </div>
    </div>
  );
};

const Settings = () => {
  return <div>Settings</div>;
};

const Logout = () => {
  return <div>Logout</div>;
};
