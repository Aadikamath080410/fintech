import type { DisbursementStatus } from '../../types';
import { cn } from '../../utils/formatters';

const STATUS_STYLES: Record<
  DisbursementStatus,
  { bg: string; text: string; dot: string }
> = {
  Draft: {
    bg: 'bg-[var(--color-status-draft-bg)]',
    text: 'text-[var(--color-status-draft-text)]',
    dot: 'bg-[var(--color-status-draft-text)]',
  },
  Submitted: {
    bg: 'bg-[var(--color-status-submitted-bg)]',
    text: 'text-[var(--color-status-submitted-text)]',
    dot: 'bg-[var(--color-status-submitted-text)]',
  },
  Verified: {
    bg: 'bg-[var(--color-status-verified-bg)]',
    text: 'text-[var(--color-status-verified-text)]',
    dot: 'bg-[var(--color-status-verified-text)]',
  },
  Processed: {
    bg: 'bg-[var(--color-status-processed-bg)]',
    text: 'text-[var(--color-status-processed-text)]',
    dot: 'bg-[var(--color-status-processed-text)]',
  },
  Audited: {
    bg: 'bg-[var(--color-status-audited-bg)]',
    text: 'text-[var(--color-status-audited-text)]',
    dot: 'bg-[var(--color-status-audited-text)]',
  },
};

interface StatusBadgeProps {
  status: DisbursementStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        styles.bg,
        styles.text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', styles.dot)} />
      {status}
    </span>
  );
}

interface TypeBadgeProps {
  type: 'Applicant' | 'Co-Applicant';
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const isApplicant = type === 'Applicant';
  return (
    <span
      className={cn(
        'inline-flex rounded px-2 py-0.5 text-xs font-medium',
        isApplicant
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-gray-100 text-gray-600',
      )}
    >
      {type}
    </span>
  );
}

interface LoanTypeBadgeProps {
  label: string;
}

export function LoanTypeBadge({ label }: LoanTypeBadgeProps) {
  return (
    <span className="inline-flex rounded bg-[var(--color-primary-light)] px-2 py-0.5 text-xs font-medium text-[var(--color-primary)]">
      {label}
    </span>
  );
}

interface PaidBadgeProps {
  status: 'Paid' | 'Pending';
}

export function PaidBadge({ status }: PaidBadgeProps) {
  const isPaid = status === 'Paid';
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
        isPaid ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700',
      )}
    >
      {status}
    </span>
  );
}
