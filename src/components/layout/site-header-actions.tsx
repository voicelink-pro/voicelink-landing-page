import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { headerActions } from "@/config/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderActionsProps = {
  className?: string;
};

export function SiteHeaderActions({ className }: SiteHeaderActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <SheetClose
        nativeButton={false}
        render={
          <a
            className={cn(
              buttonVariants({ size: "sm", variant: "ghost" }),
              "h-9 px-4 text-foreground",
            )}
            href={headerActions.login.href}
          />
        }
      >
        {headerActions.login.label}
      </SheetClose>
      <SheetClose
        nativeButton={false}
        render={
          <Link
            className={cn(buttonVariants({ size: "sm" }), "h-9 px-4")}
            href={headerActions.meeting.href}
          />
        }
      >
        {headerActions.meeting.label}
      </SheetClose>
    </div>
  );
}
