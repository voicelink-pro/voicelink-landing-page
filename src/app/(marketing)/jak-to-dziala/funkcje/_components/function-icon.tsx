import { BrandIcon } from "@/components/brand-icon";

type FunctionIconProps = {
  icon: string;
  className?: string;
};

export function FunctionIcon({ icon, className }: FunctionIconProps) {
  return <BrandIcon icon={icon} className={className} />;
}
