import Image from "next/image";
import Link from "next/link";

import { SiteHeaderActions } from "@/components/layout/site-header-actions";
import { SiteHeaderMobileMenu } from "@/components/layout/site-header-mobile-menu";
import { SiteHeaderNav } from "@/components/layout/site-header-nav";
import { Container } from "@/components/layout/container";
import { Card, CardHeader } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-[var(--page-shell-inset)] z-30">
      <Container className="py-4 sm:py-5">
        <Card
          className="glass-surface overflow-visible bg-transparent ring-white/40 sm:[--card-spacing:--spacing(3.5)]"
          size="sm"
        >
          <CardHeader className="flex flex-row items-center gap-3">
            <Link className="shrink-0" href="/">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.name}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="h-7 w-auto sm:h-8"
                sizes="122px"
                unoptimized
                priority
              />
            </Link>
            <SiteHeaderNav className="hidden min-w-0 flex-1 justify-center lg:flex" />
            <SiteHeaderActions className="ml-auto hidden lg:flex" />
            <SiteHeaderMobileMenu className="ml-auto lg:hidden" />
          </CardHeader>
        </Card>
      </Container>
    </header>
  );
}
