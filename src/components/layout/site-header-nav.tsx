import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  comingSoonLabel,
  mainNavigation,
  type NavigationChild,
} from "@/config/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderNavProps = {
  className?: string;
  itemClassName?: string;
};

const navItemClassName = cn(
  buttonVariants({ variant: "ghost" }),
  "h-9 px-4 motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:-translate-y-0.5 hover:bg-transparent focus:bg-transparent focus-visible:bg-transparent active:bg-transparent aria-expanded:bg-transparent data-active:bg-transparent data-active:hover:bg-transparent data-active:focus:bg-transparent",
);

const navTriggerClassName = cn(
  navItemClassName,
  "data-open:bg-transparent data-open:hover:bg-transparent data-open:focus:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent data-popup-open:focus:bg-transparent",
);

export function SiteHeaderNav({
  className,
  itemClassName,
}: SiteHeaderNavProps) {
  const itemClass = cn(navItemClassName, itemClassName);
  const triggerClass = cn(navTriggerClassName, itemClassName);

  return (
    <NavigationMenu
      aria-label="Główna"
      className={cn("max-w-none", className)}
      closeDelay={150}
    >
      <NavigationMenuList>
        {mainNavigation.map((item) =>
          "items" in item ? (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuTrigger className={triggerClass}>
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex w-max min-w-60 flex-col gap-0.5">
                  {item.items.map((child) => (
                    <li key={child.label}>
                      <SolutionMenuEntry child={child} />
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                className={itemClass}
                render={<Link href={item.href} />}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function SolutionMenuEntry({ child }: { child: NavigationChild }) {
  if (child.href) {
    return (
      <NavigationMenuLink
        className="w-full"
        closeOnClick
        render={<Link href={child.href} />}
      >
        {child.label}
      </NavigationMenuLink>
    );
  }

  return (
    <span
      aria-disabled="true"
      className="flex w-full items-center justify-between gap-4 rounded-md p-2 text-sm text-muted-foreground"
    >
      {child.label}
      <Badge variant="secondary">{comingSoonLabel}</Badge>
    </span>
  );
}
