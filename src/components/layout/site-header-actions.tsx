import { Button } from "@/components/ui/button";
import { headerActions } from "@/config/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderActionsProps = {
  className?: string;
};

export function SiteHeaderActions({ className }: SiteHeaderActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button className="rounded-md px-2.5 text-foreground" variant="ghost">
        {headerActions.login.label}
      </Button>
      <Button
        className="border-border motion-safe:hover:-translate-y-1"
        variant="default"
      >
        {headerActions.meeting.label}
      </Button>
    </div>
  );
}
