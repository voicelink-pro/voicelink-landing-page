import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import {
  RevealGroup,
  RevealItem,
  RevealList,
  RevealListItem,
} from "@/components/layout/reveal-motion";
import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const phoneHref = siteConfig.phone.replace(/[^\d+]/g, "");

const solutions = mainNavigation[0];
const howItWorks = mainNavigation[1];

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: readonly FooterLink[];
};

function linksWithHref(
  items: readonly { label: string; href?: string }[],
): FooterLink[] {
  return items.flatMap((item) =>
    item.href ? [{ label: item.label, href: item.href }] : [],
  );
}

const footerColumns: readonly FooterColumn[] = [
  {
    title: solutions.label,
    links: linksWithHref(solutions.items),
  },
  {
    title: howItWorks.label,
    links: linksWithHref(howItWorks.items),
  },
  {
    title: "Placówka",
    links: [
      { label: "Bezpieczeństwo", href: "/bezpieczenstwo" },
      { label: "VoiceLinkCenter", href: "/voicelink-center" },
      { label: "Cennik", href: "/cennik" },
    ],
  },
];

const visibleFooterColumns = footerColumns.filter(
  (column) => column.links.length > 0,
);

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background px-3 pt-6 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
      <div className="rounded-3xl bg-[#062059] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-12 lg:py-14">
        <RevealGroup
          className={
            visibleFooterColumns.length > 2
              ? "grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
              : "grid gap-10 sm:grid-cols-2 lg:gap-8"
          }
        >
          {visibleFooterColumns.map((column) => (
            <RevealItem key={column.title} className="flex flex-col gap-4">
              <p className="inline-flex items-center gap-2.5 text-lg font-medium text-white">
                {column.title}
                <span className="inline-flex size-6 items-center justify-center rounded-full ring-1 ring-white/30">
                  <ArrowUpRightIcon aria-hidden="true" className="size-3.5" />
                </span>
              </p>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      className="text-base text-white transition-opacity hover:opacity-75"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealList className="mt-10 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          <RevealListItem className="flex flex-col gap-1">
            <p className="text-lg font-medium">Telefon</p>
            <a
              className="w-fit text-base text-white transition-opacity hover:opacity-75"
              href={`tel:${phoneHref}`}
            >
              {siteConfig.phone}
            </a>
          </RevealListItem>
          <RevealListItem className="flex flex-col gap-1">
            <p className="text-lg font-medium">E-mail</p>
            <a
              className="w-fit text-base text-white transition-opacity hover:opacity-75"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
          </RevealListItem>
          <RevealListItem className="flex flex-col gap-1 lg:items-end lg:text-right">
            <p className="text-lg font-medium">
              © {year} {siteConfig.name}
            </p>
            <p className="text-base text-white">Wszelkie prawa zastrzeżone</p>
          </RevealListItem>
        </RevealList>
      </div>
    </footer>
  );
}
