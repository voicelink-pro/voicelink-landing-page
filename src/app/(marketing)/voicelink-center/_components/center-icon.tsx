import { BrandIcon } from "@/components/brand-icon";

type CenterIconProps = {
  icon: string;
  className?: string;
};

export function CenterIcon({ icon, className }: CenterIconProps) {
  return <BrandIcon icon={icon} className={className} />;
}
