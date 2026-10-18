"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

type SliderProps = Omit<
  SliderPrimitive.Root.Props<number>,
  "children" | "value" | "defaultValue"
> & {
  value: number;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaValueText?: string;
};

function Slider({
  className,
  value,
  min = 0,
  max = 100,
  step = 1,
  ariaLabel,
  ariaLabelledBy,
  ariaValueText,
  ...props
}: SliderProps) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("w-full", className)}
      locale="pl-PL"
      max={max}
      min={min}
      step={step}
      value={value}
      {...props}
    >
      <SliderPrimitive.Control className="group/slider relative flex w-full cursor-pointer touch-none items-center py-2.5 select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        <SliderPrimitive.Track className="relative h-2 w-full overflow-hidden rounded-full bg-secondary ring-1 ring-foreground/10 ring-inset">
          <SliderPrimitive.Indicator className="h-full rounded-full bg-primary transition-[width] duration-75 ease-out" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-valuetext={ariaValueText}
          className="size-5 rounded-full border-2 border-primary bg-white shadow-[0_2px_8px_rgba(15,55,132,0.3)] transition-[transform,box-shadow,background-color] duration-150 ease-out group-hover/slider:scale-105 hover:scale-110 active:scale-95 active:bg-secondary has-focus-visible:ring-3 has-focus-visible:ring-ring/35 has-focus-visible:outline-none"
        />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
