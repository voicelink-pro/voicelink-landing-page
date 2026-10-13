import { BrandIcon } from "@/components/brand-icon";

type ProcessIconProps = {
  icon: string;
  className?: string;
};

export function ProcessIcon({ icon, className }: ProcessIconProps) {
  return <BrandIcon icon={icon} className={className} />;
}
