import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
  className?: string;
};

export function ContentImage({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 896px",
  caption,
  className = "",
}: Props) {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[#17140f] ring-1 ring-[#c8a24a]/15">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={90}
          priority={priority}
          className="object-cover object-center"
        />
        {/* 하단을 살짝 눌러 카드 경계와 캡션 사이 대비를 만듭니다 */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a]/35 via-transparent to-transparent"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 flex gap-2 text-sm leading-6 text-[#9c9285]">
          <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-[#c8a24a]/50" />
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
