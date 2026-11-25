export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbList(
  items: readonly BreadcrumbItem[],
  siteUrl: URL,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString(),
    })),
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
