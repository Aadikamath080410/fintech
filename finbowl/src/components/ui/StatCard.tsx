interface StatCardProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export function StatCard({ label, value, valueClassName }: StatCardProps) {
  return (
    <div className="flex min-w-[160px] flex-1 flex-col gap-1.5 rounded-lg border border-[var(--color-border)] bg-white px-4 py-4 shadow-sm">
      <span className="text-xs font-medium text-[var(--color-text-secondary)] leading-tight">
        {label}
      </span>
      <span
        className={`text-xl font-bold tracking-tight text-[var(--color-text-primary)] ${valueClassName ?? ''}`}
      >
        {value}
      </span>
    </div>
  );
}
