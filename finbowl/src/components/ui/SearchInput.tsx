import { Search } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/formatters';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
  containerClassName?: string;
}

export function SearchInput({
  shortcut,
  containerClassName,
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn('relative', containerClassName)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
      <input
        className={cn(
          'w-full rounded-lg border border-[var(--color-border)] bg-white py-2 pl-9 pr-12 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]',
          className,
        )}
        {...props}
      />
      {shortcut && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-[var(--color-border)] bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-text-muted)]">
          {shortcut}
        </span>
      )}
    </div>
  );
}
