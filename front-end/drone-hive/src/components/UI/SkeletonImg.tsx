// SkeletonImg.js
import { cn } from "@/libs/utils";
import Image from 'next/image';

function SkeletonImg({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative animate-pulse rounded-md bg-stone-200/10 dark:bg-stone-50/10",
        className
      )}
      {...props}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          src="/app.png"
          alt="placeholder"
          layout="fill"
          objectFit="cover"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  );
}

export { SkeletonImg };
