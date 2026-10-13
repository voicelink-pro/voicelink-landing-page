import { BrandIcon } from "@/components/brand-icon";

type IntegrationIconProps = {
  icon: string;
  className?: string;
  tone?: "brand";
  scale?: number;
};

export function IntegrationIcon({
  icon,
  className,
  tone,
  scale,
}: IntegrationIconProps) {
  return (
    <BrandIcon icon={icon} className={className} tone={tone} scale={scale} />
  );
}
