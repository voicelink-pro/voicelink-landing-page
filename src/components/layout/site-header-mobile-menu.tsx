"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { SiteHeaderActions } from "@/components/layout/site-header-actions";
import { Badge } from "@/components/ui/badge";
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
import { comingSoonLabel, mainNavigation } from "@/config/navigation";
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
          {mainNavigation.map((item) =>
            "items" in item ? (
              <div key={item.href} className="flex flex-col gap-1">
                <p className="px-2.5 pt-1 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  {item.label}
                </p>
                {item.items.map((child) =>
                  "href" in child ? (
                    <SheetClose
                      key={child.label}
                      nativeButton={false}
                      render={
                        <Link
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "w-full justify-start",
                          )}
                          href={child.href}
                        />
                      }
                    >
                      {child.label}
                    </SheetClose>
                  ) : (
                    <span
                      key={child.label}
                      aria-disabled="true"
                      className="flex items-center justify-between gap-4 px-2.5 py-1.5 text-sm text-muted-foreground"
                    >
                      {child.label}
                      <Badge variant="secondary">{comingSoonLabel}</Badge>
                    </span>
                  ),
                )}
              </div>
            ) : (
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
            ),
          )}
        </nav>
        <SiteHeaderActions className="flex-col items-stretch p-4 pt-0 [&_a]:w-full [&_button]:w-full" />
      </SheetContent>
    </Sheet>
  );
}
