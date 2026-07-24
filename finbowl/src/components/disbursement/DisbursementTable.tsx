import { ArrowDown, ArrowUp, ArrowUpDown, Filter, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useDisbursementContext } from '../../context/DisbursementContext';
import type { ColumnKey, Disbursement } from '../../types';
import { formatCurrency, formatDate, formatPercent } from '../../utils/formatters';
import { Avatar } from '../ui/Avatar';
import { StatusBadge } from '../ui/Badge';
import { ColumnSelector, getColumnLabel } from './ColumnSelector';

interface DisbursementTableProps {
  data: Disbursement[];
}

export function DisbursementTable({ data }: DisbursementTableProps) {
  const {
    visibleColumns,
    toggleColumn,
    selectedRows,
    toggleRowSelection,
    toggleAllRows,
    isColumnSelectorOpen,
    setColumnSelectorOpen,
    setCreateViewModalOpen,
    setPendingViewColumns,
  } = useDisbursementContext();
  const [sort, setSort] = useState<{ key: ColumnKey; direction: 'asc' | 'desc' } | null>(null);

  const allSelected = data.length > 0 && data.every((row) => selectedRows.has(row.id));

  const sortedData = useMemo(() => {
    if (!sort) return data;
    return [...data].sort((a, b) => {
      const first = a[sort.key];
      const second = b[sort.key];
      const aValue = typeof first === 'object' && first ? first.name : first ?? '';
      const bValue = typeof second === 'object' && second ? second.name : second ?? '';
      const comparison = typeof aValue === 'number' && typeof bValue === 'number'
        ? aValue - bValue
        : String(aValue).localeCompare(String(bValue));
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sort]);

  const toggleSort = (key: ColumnKey) => {
    setSort((current) =>
      current?.key === key
        ? { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' },
    );
  };

  const renderCell = (row: Disbursement, key: ColumnKey) => {
    switch (key) {
      case 'disbursementDate':
        return formatDate(row.disbursementDate);
      case 'loanId':
        return (
          <Link
            to={`/rms/disbursement/${row.loanId}`}
            className="font-medium text-[var(--color-link)] hover:underline"
          >
            {row.loanId}
          </Link>
        );
      case 'status':
        return <StatusBadge status={row.status} />;
      case 'applicantName':
        return <span className="font-medium">{row.applicantName}</span>;
      case 'bankName':
        return row.bankName;
      case 'loanType':
        return row.loanType;
      case 'sanctionedAmt':
        return formatCurrency(row.sanctionedAmt);
      case 'disbursedAmt':
        return formatCurrency(row.disbursedAmt);
      case 'balancedAmt':
        return formatCurrency(row.balancedAmt);
      case 'verifiedAmt':
        return formatCurrency(row.verifiedAmt);
      case 'referralPercent':
        return formatPercent(row.referralPercent);
      case 'creditExecutive':
        return (
          <div className="flex items-center gap-2">
            <Avatar src={row.creditExecutive.avatar} alt={row.creditExecutive.name} />
            <span>{row.creditExecutive.name}</span>
          </div>
        );
      case 'bankExecutive':
        return (
          <div className="flex items-center gap-2">
            <Avatar src={row.bankExecutive.avatar} alt={row.bankExecutive.name} />
            <span>{row.bankExecutive.name}</span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSaveView = () => {
    setPendingViewColumns([...visibleColumns]);
    setColumnSelectorOpen(false);
    setCreateViewModalOpen(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-gray-50/80">
            <th className="w-10 px-4 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => toggleAllRows(data.map((r) => r.id))}
                className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
            </th>
            {visibleColumns.map((key) => (
              <th
                key={key}
                className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)]"
              >
                <span className="inline-flex items-center gap-1">
                  <button type="button" onClick={() => toggleSort(key)} className="inline-flex items-center gap-1 hover:text-[var(--color-primary)]">
                    {getColumnLabel(key)}
                    {sort?.key === key ? (sort.direction === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3 text-[var(--color-text-muted)]" />}
                  </button>
                  {(key === 'status' || key === 'verifiedAmt') && (
                    <Filter className="h-3 w-3 text-[var(--color-text-muted)]" />
                  )}
                </span>
              </th>
            ))}
            <th className="relative w-10 px-3 py-3">
              <button
                onClick={() => setColumnSelectorOpen(!isColumnSelectorOpen)}
                className="rounded p-1 text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
                aria-label="Column settings"
              >
                <Settings2 className="h-4 w-4" />
              </button>
              <ColumnSelector
                isOpen={isColumnSelectorOpen}
                onClose={() => setColumnSelectorOpen(false)}
                selectedColumns={visibleColumns}
                onToggle={toggleColumn}
                onSaveView={handleSaveView}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[var(--color-border-light)] transition-colors hover:bg-gray-50/50"
            >
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.has(row.id)}
                  onChange={() => toggleRowSelection(row.id)}
                  className="h-4 w-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
              </td>
              {visibleColumns.map((key) => (
                <td
                  key={key}
                  className="whitespace-nowrap px-3 py-3 text-[var(--color-text-primary)]"
                >
                  {renderCell(row, key)}
                </td>
              ))}
              <td className="px-3 py-3" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
