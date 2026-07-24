interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md';
}

export function Avatar({ src, alt, size = 'sm' }: AvatarProps) {
  const sizeClass = size === 'sm' ? 'h-6 w-6' : 'h-8 w-8';
  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClass} rounded-full object-cover ring-1 ring-[var(--color-border)]`}
    />
  );
}

export function UserAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
    />
  );
}
