"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { SiteHeaderActions } from "@/components/layout/site-header-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderMobileMenuProps = {
  className?: string;
};

export function SiteHeaderMobileMenu({ className }: SiteHeaderMobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button className={className} size="icon" variant="ghost" />}
      >
        <MenuIcon />
        <span className="sr-only">Otwórz menu</span>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Nawigacja strony VoiceLink
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Główna" className="flex flex-col gap-1 px-4">
          {mainNavigation.map((item) => (
            <SheetClose
              key={item.href}
              nativeButton={false}
              render={
                <Link
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start",
                  )}
                  href={item.href}
                />
              }
            >
              {item.label}
            </SheetClose>
          ))}
        </nav>
        <SiteHeaderActions className="flex-col items-stretch p-4 pt-0 [&_button]:w-full" />
      </SheetContent>
    </Sheet>
  );
}
