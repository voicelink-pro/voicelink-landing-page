import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const phoneHref = siteConfig.phone.replace(/[^\d+]/g, "");

export function SiteFooter() {
  return (
    <footer className="-mx-2 mt-2 border-t border-foreground/6 bg-white sm:-mx-3 lg:-mx-4">
      <Container className="flex flex-col gap-8 py-8 sm:py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-4">
            <Link className="w-fit" href="/">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.name}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="h-8 w-auto sm:h-9"
                sizes="140px"
                unoptimized
              />
            </Link>
            <div className="flex flex-col gap-1.5">
              <a
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                href={`tel:${phoneHref}`}
              >
                {siteConfig.phone}
              </a>
              <a
                className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          <nav aria-label="Stopka" className="flex flex-col gap-3">
            <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              Nawigacja
            </p>
            <ul className="flex flex-col gap-2">
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="border-t border-foreground/6 pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
