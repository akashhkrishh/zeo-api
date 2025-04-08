"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { navList } from "./nav-bar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function MobileDrawer() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleCloseDrawer = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm flex flex-col">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-4 p-4 text-lg">
            {navList.map((nav, index) => (
              <Link
                key={index}
                href={nav.href}
                onClick={handleCloseDrawer} // Close the drawer when clicked
              >
                {nav.title}
              </Link>
            ))}
          </div>

          <DrawerFooter>
            {/* Optional footer buttons can go here */}
                  <Button onClick={() => {router.push("/custom-response");handleCloseDrawer()}} variant='outline' className=' bg-primary hover:text-primary text-lg py-2 h-12'>
                          Custom Response
                        </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
