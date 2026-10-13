import { BrandIcon } from "@/components/brand-icon";

type SecurityIconProps = {
  icon: string;
  className?: string;
  tone?: "image" | "primary";
};

export function SecurityIcon({ icon, className, tone }: SecurityIconProps) {
  return (
    <BrandIcon
      icon={icon}
      className={className}
      tone={tone === "primary" ? "brand" : tone}
    />
  );
}
