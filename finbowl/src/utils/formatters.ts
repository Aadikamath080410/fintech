export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return '--';
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatCurrencyCompact(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return '--';
  return `${value.toFixed(4)}%`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
