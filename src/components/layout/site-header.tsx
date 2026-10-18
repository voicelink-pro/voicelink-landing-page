"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SiteHeaderMobileMenu } from "@/components/layout/site-header-mobile-menu";
import { SiteHeaderNav } from "@/components/layout/site-header-nav";
import { Button } from "@/components/ui/button";
import { headerActions } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const heroNavItemClassName =
  "text-white hover:text-white focus:text-white focus-visible:text-white active:text-white aria-expanded:text-white data-active:text-white data-active:hover:text-white data-active:focus:text-white data-open:text-white data-open:hover:text-white data-open:focus:text-white data-popup-open:text-white data-popup-open:hover:text-white data-popup-open:focus:text-white";

const useClientLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const routeScrollListeners = new Set<() => void>();

// After Next.js resets the scroll position, before the browser paints.
export function SiteHeaderRouteSync() {
  const pathname = usePathname();

  useClientLayoutEffect(() => {
    for (const listener of routeScrollListeners) {
      listener();
    }
  }, [pathname]);

  return null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [snapChrome, setSnapChrome] = useState(false);
  const onHero =
    (pathname === "/" ||
      pathname === "/bezpieczenstwo" ||
      pathname === "/jak-to-dziala/integracja" ||
      pathname === "/jak-to-dziala/funkcje" ||
      pathname === "/jak-to-dziala/proces-wspolpracy" ||
      pathname === "/cennik" ||
      pathname === "/kalkulator-oszczednosci" ||
      pathname === "/kalkulator" ||
      pathname === "/voicelink-center" ||
      pathname === "/blog" ||
      pathname.startsWith("/blog/") ||
      pathname === "/kontakt" ||
      pathname === "/przetestuj") &&
    !isScrolled;

  useClientLayoutEffect(() => {
    const syncRouteScroll = () => {
      setSnapChrome(true);
      setIsScrolled(window.scrollY > 8);
    };

    routeScrollListeners.add(syncRouteScroll);

    return () => {
      routeScrollListeners.delete(syncRouteScroll);
    };
  }, []);

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 8);

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setSnapChrome(false));

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-30"
      data-header-snap={snapChrome ? "" : undefined}
    >
      <div
        className={cn(
          "flex h-[var(--site-header-height)] w-full items-center gap-2 rounded-b-3xl border-b px-3 motion-safe:transition-[background-color,border-color,box-shadow] motion-safe:duration-500 motion-safe:ease-out sm:gap-3 sm:px-6",
          isScrolled
            ? "border-border bg-white/92 shadow-[0_14px_36px_-22px_rgba(15,55,132,0.55)] backdrop-blur-md"
            : "border-transparent bg-transparent shadow-none",
        )}
      >
        <Link
          aria-label={siteConfig.name}
          className="ms-1.5 grid shrink-0 sm:ms-4 lg:ms-8"
          href="/"
        >
          <Image
            src={siteConfig.logo.navy.src}
            alt=""
            width={siteConfig.logo.navy.width}
            height={siteConfig.logo.navy.height}
            className={cn(
              "col-start-1 row-start-1 h-6 w-auto motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out sm:h-7",
              onHero && "opacity-0",
            )}
            sizes="170px"
            unoptimized
            priority
          />
          <Image
            src={siteConfig.logo.white.src}
            alt=""
            width={siteConfig.logo.white.width}
            height={siteConfig.logo.white.height}
            className={cn(
              "col-start-1 row-start-1 h-6 w-auto motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out sm:h-7",
              !onHero && "opacity-0",
            )}
            sizes="170px"
            unoptimized
            priority
          />
        </Link>
        <SiteHeaderNav
          className="hidden min-w-0 flex-1 justify-center xl:flex"
          itemClassName={onHero ? heroNavItemClassName : undefined}
        />
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button
            className={cn(
              "hidden motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:-translate-y-0.5 xl:inline-flex",
              onHero && "text-white hover:bg-white/10 hover:text-white",
            )}
            nativeButton={false}
            render={<a href={headerActions.login.href} />}
            size="sm"
            variant="ghost"
          >
            {headerActions.login.label}
          </Button>
          <Button
            className={cn(
              "h-8 px-3 text-xs motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:-translate-y-0.5 sm:h-9 sm:px-4 sm:text-[0.8rem] xl:me-8",
              onHero && "bg-black text-white hover:bg-black/85",
            )}
            nativeButton={false}
            render={<Link href={headerActions.meeting.href} />}
            size="sm"
          >
            {headerActions.meeting.label}
          </Button>
          <SiteHeaderMobileMenu
            className={cn(
              "me-1 size-9 motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:-translate-y-0.5 sm:me-4 xl:hidden",
              onHero && "text-white hover:bg-white/10 hover:text-white",
            )}
          />
        </div>
      </div>
    </header>
  );
}
