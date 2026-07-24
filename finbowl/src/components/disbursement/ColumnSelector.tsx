import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ColumnDefinition, ColumnKey } from '../../types';
import { Button } from '../ui/Button';

export const ALL_COLUMNS: ColumnDefinition[] = [
  { key: 'disbursementDate', label: 'Disbursement Date', sortable: true },
  { key: 'loanId', label: 'Loan ID', sortable: true },
  { key: 'applicantName', label: 'Applicant Name', sortable: true },
  { key: 'bankName', label: 'Bank Name', sortable: true },
  { key: 'loanType', label: 'Loan Type' },
  { key: 'sanctionedAmt', label: 'Sanctioned Amt', sortable: true },
  { key: 'disbursedAmt', label: 'Disbursed Amt', sortable: true },
  { key: 'balancedAmt', label: 'Balanced Amt', sortable: true },
  { key: 'status', label: 'Status', filterable: true },
  { key: 'verifiedAmt', label: 'Verified', filterable: true },
  { key: 'referralPercent', label: 'Referral %', sortable: true },
  { key: 'creditExecutive', label: 'Credit Executive', sortable: true },
  { key: 'bankExecutive', label: 'Bank Executive', sortable: true },
];

interface ColumnSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColumns: ColumnKey[];
  onToggle: (key: ColumnKey) => void;
  onSaveView: () => void;
}

export function ColumnSelector({
  isOpen,
  onClose,
  selectedColumns,
  onToggle,
  onSaveView,
}: ColumnSelectorProps) {
  const [search, setSearch] = useState('');

  const filteredColumns = useMemo(
    () =>
      ALL_COLUMNS.filter((col) =>
        col.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />
      <section
        className="absolute right-0 top-full z-50 mt-2 flex h-[min(480px,calc(100vh-12rem))] w-[320px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-xl"
        aria-label="Select columns for saved view"
      >
        <div className="border-b border-[var(--color-border)] p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search for Loans"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white py-2 pl-10 pr-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/15"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          {filteredColumns.map((col) => {
            const isChecked = selectedColumns.includes(col.key);
            return (
              <label
                key={col.key}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm hover:bg-[var(--color-primary-light)]/40"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggle(col.key)}
                  className="h-4 w-4 rounded border-gray-300 accent-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span className="font-medium text-[var(--color-text-primary)]">
                  {col.label}
                </span>
              </label>
            );
          })}
          {filteredColumns.length === 0 && (
            <p className="px-2 py-6 text-center text-sm text-[var(--color-text-muted)]">
              No columns found.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-white px-3 py-3">
          <button
            onClick={onClose}
            className="px-2 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            Cancel
          </button>
          <Button variant="primary" className="order-first px-4 py-1.5 text-xs shadow-sm" onClick={onSaveView}>
            Save View
          </Button>
        </div>
      </section>
    </>
  );
}

export function getColumnLabel(key: ColumnKey): string {
  return ALL_COLUMNS.find((c) => c.key === key)?.label ?? key;
}
