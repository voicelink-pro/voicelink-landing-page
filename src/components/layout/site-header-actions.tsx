import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { headerActions } from "@/config/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderActionsProps = {
  className?: string;
};

export function SiteHeaderActions({ className }: SiteHeaderActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button className="h-9 px-4 text-foreground" variant="ghost">
        {headerActions.login.label}
      </Button>
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
