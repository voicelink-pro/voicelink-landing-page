import Image from "next/image";

import { centerContent } from "../_content/center";

const { image, imageCaption } = centerContent.hero;

export function CenterPanel() {
  return (
    <figure className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-[1.15rem] bg-white shadow-[0_40px_90px_-36px_rgba(0,0,0,0.72)] ring-1 ring-white/55">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-auto w-full"
          sizes="(min-width: 1280px) 1240px, calc(100vw - 2.5rem)"
          priority
          unoptimized
        />
      </div>
      <figcaption className="text-sm leading-6 text-white/85">
        {imageCaption}
      </figcaption>
    </figure>
  );
}
