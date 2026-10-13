import type { ReactNode } from "react";

type MarketingTemplateProps = Readonly<{
  children: ReactNode;
}>;

export default function MarketingTemplate({
  children,
}: MarketingTemplateProps) {
  return <div className="page-enter min-w-0">{children}</div>;
}
