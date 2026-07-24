import { AlertCircle, FileX, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function EmptyState({
  title = 'No disbursements found',
  description = 'There are no disbursement records to display. Try adjusting your search or filters.',
  onRetry,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-gray-100 p-4">
        <FileX className="h-8 w-8 text-[var(--color-text-muted)]" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-[var(--color-text-primary)]">
        {title}
      </h3>
      <p className="mb-4 max-w-sm text-sm text-[var(--color-text-secondary)]">
        {description}
      </p>
      {onRetry && (
        <Button variant="outline" icon={<RefreshCw className="h-4 w-4" />} onClick={onRetry}>
          Refresh
        </Button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Something went wrong while loading data.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-red-50 p-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-[var(--color-text-primary)]">
        Failed to load data
      </h3>
      <p className="mb-4 max-w-sm text-sm text-[var(--color-text-secondary)]">{message}</p>
      {onRetry && (
        <Button variant="primary" icon={<RefreshCw className="h-4 w-4" />} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="space-y-3 p-4">
      <div className="skeleton h-10 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton h-12 w-full" />
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="flex flex-wrap gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton h-[72px] min-w-[140px] flex-1 rounded-lg" />
      ))}
    </div>
  );
}

export function LoanDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-8 w-64" />
      <div className="skeleton h-6 w-48" />
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-[72px] min-w-[160px] flex-1 rounded-lg" />
        ))}
      </div>
      <div className="skeleton h-96 w-full rounded-lg" />
    </div>
  );
}
