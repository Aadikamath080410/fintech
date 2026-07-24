import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/formatters';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] border border-transparent',
  outline:
    'bg-white text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-gray-50',
  ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-gray-100 border border-transparent',
  text: 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-transparent',
};

export function Button({
  variant = 'outline',
  icon,
  iconRight,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
