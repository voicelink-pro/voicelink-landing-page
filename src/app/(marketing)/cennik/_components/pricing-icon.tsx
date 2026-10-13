import { BrandIcon } from "@/components/brand-icon";

type PricingIconProps = {
  icon: string;
  className?: string;
};

export function PricingIcon({ icon, className }: PricingIconProps) {
  return <BrandIcon icon={icon} className={className} />;
}
