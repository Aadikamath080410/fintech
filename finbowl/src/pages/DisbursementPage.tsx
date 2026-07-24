import { ChevronDown, Clock, FileSpreadsheet, Plus } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ActivityDrawer } from '../components/activity/ActivityDrawer';
import { CreateViewModal } from '../components/disbursement/CreateViewModal';
import { AddDisbursementDrawer } from '../components/disbursement/AddDisbursementDrawer';
import { DisbursementTable } from '../components/disbursement/DisbursementTable';
import { useDisbursementContext } from '../context/DisbursementContext';
import { useDisbursements } from '../hooks/useDisbursements';
import { formatCurrencyCompact } from '../utils/formatters';
import { Button } from '../components/ui/Button';
import { Pagination } from '../components/ui/Pagination';
import { SearchInput } from '../components/ui/SearchInput';
import { StatCard } from '../components/ui/StatCard';
import {
  EmptyState,
  ErrorState,
  StatsSkeleton,
  TableSkeleton,
} from '../components/ui/States';
import type { Disbursement } from '../types';

export function DisbursementPage() {
  const { data, stats, state, error, refetch } = useDisbursements();
  const {
    isActivityOpen,
    setActivityOpen,
    isCreateViewModalOpen,
    setCreateViewModalOpen,
    createView,
    pendingViewColumns,
    savedViews,
    activeViewId,
    applySavedView,
    setActiveViewId,
    setVisibleColumns,
    isAddDisbursementOpen,
    setAddDisbursementOpen,
    addDisbursement,
  } = useDisbursementContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isSavedViewsOpen, setSavedViewsOpen] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        document.getElementById('disbursement-search')?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter(
      (row: Disbursement) =>
        row.loanId.toLowerCase().includes(q) ||
        row.applicantName.toLowerCase().includes(q) ||
        row.bankName.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q),
    );
  }, [data, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const exportRows = () => {
    const headers = ['Disbursement Date', 'Loan ID', 'Status', 'Applicant Name', 'Bank Name', 'Loan Type', 'Sanctioned Amount', 'Disbursed Amount', 'Balanced Amount', 'Verified Amount', 'Referral %'];
    const escape = (value: string | number | null) => `"${String(value ?? '').replaceAll('"', '""')}"`;
    const body = filteredData.map((row) => [
      row.disbursementDate, row.loanId, row.status, row.applicantName, row.bankName,
      row.loanType, row.sanctionedAmt, row.disbursedAmt, row.balancedAmt, row.verifiedAmt, row.referralPercent,
    ].map(escape).join(','));
    const blob = new Blob([[headers.map(escape).join(','), ...body].join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'disbursements.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const resetView = () => {
    setActiveViewId(null);
    setVisibleColumns(['disbursementDate', 'loanId', 'status', 'applicantName', 'bankName', 'sanctionedAmt', 'verifiedAmt', 'referralPercent', 'creditExecutive', 'bankExecutive']);
    setSavedViewsOpen(false);
  };

  const importCsv = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.csv')) {
      window.alert('Please export the Excel sheet as a CSV file before importing it.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const lines = String(reader.result).trim().split(/\r?\n/).filter(Boolean);
      if (lines.length < 2) return window.alert('The selected CSV does not contain any records.');
      const headers = lines[0].split(',').map((header) => header.trim().replace(/^"|"$/g, '').toLowerCase());
      const valueAt = (values: string[], ...names: string[]) => {
        const index = headers.findIndex((header) => names.includes(header));
        return index >= 0 ? values[index]?.trim().replace(/^"|"$/g, '') ?? '' : '';
      };
      const imported = lines.slice(1).map((line, index) => {
        const values = line.match(/("(?:[^"]|"")*"|[^,]*)(?:,|$)/g)?.map((value) => value.replace(/,$/, '').replace(/""/g, '"')) ?? [];
        const sanctionedAmt = Number(valueAt(values, 'sanctioned amount', 'sanctioned amt')) || null;
        const disbursedAmt = Number(valueAt(values, 'disbursed amount', 'disbursed amt')) || null;
        const status = valueAt(values, 'status');
        return {
          id: crypto.randomUUID(),
          disbursementDate: valueAt(values, 'disbursement date') || new Date().toISOString().slice(0, 10),
          loanId: valueAt(values, 'loan id') || `IMP-${Date.now()}-${index + 1}`,
          status: ['Draft', 'Submitted', 'Verified', 'Processed', 'Audited'].includes(status) ? status as Disbursement['status'] : 'Draft',
          applicantName: valueAt(values, 'applicant name') || 'Imported applicant',
          bankName: valueAt(values, 'bank name', 'bank') || 'Not specified',
          loanType: valueAt(values, 'loan type') || 'Home Loan',
          sanctionedAmt,
          disbursedAmt,
          balancedAmt: sanctionedAmt === null ? null : sanctionedAmt - (disbursedAmt ?? 0),
          verifiedAmt: Number(valueAt(values, 'verified amount', 'verified')) || null,
          referralPercent: Number(valueAt(values, 'referral %', 'referral percent')) || null,
          creditExecutive: { name: 'Imported', avatar: '' },
          bankExecutive: { name: 'Imported', avatar: '' },
        } satisfies Disbursement;
      });
      imported.forEach(addDisbursement);
    };
    reader.readAsText(file);
  };

  const activityEntries = [
    {
      id: '1',
      action: 'Disbursement Created',
      user: 'Amit Sharma',
      avatar: 'https://i.pravatar.cc/150?img=1',
      timestamp: '20 May (9:20 AM)',
    },
    {
      id: '2',
      action: 'Status Updated',
      user: 'Preethi Sharma',
      avatar: 'https://i.pravatar.cc/150?img=2',
      timestamp: '21 May (11:30 AM)',
      change: {
        label: 'Status',
        from: 'Draft',
        to: 'Submitted',
        fromBadge: 'Draft' as const,
        toBadge: 'Submitted' as const,
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <nav className="mb-1 flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
            <Link to="/" className="hover:text-[var(--color-text-secondary)] transition-colors">
              RMS
            </Link>
            <span className="select-none">›</span>
            <span className="font-medium text-[var(--color-primary)]">Disbursement</span>
          </nav>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Disbursement
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            icon={<Clock className="h-4 w-4" />}
            onClick={() => setActivityOpen(true)}
          >
            Activity
          </Button>
          <input ref={importInputRef} type="file" accept=".csv,text/csv" onChange={importCsv} className="hidden" />
          <Button variant="outline" icon={<FileSpreadsheet className="h-4 w-4" />} onClick={() => importInputRef.current?.click()}>
            Import Excel
          </Button>
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            iconRight={<ChevronDown className="h-4 w-4" />}
            onClick={() => setAddDisbursementOpen(true)}
          >
            Add Disbursement
          </Button>
        </div>
      </div>

      {state === 'loading' ? (
        <StatsSkeleton />
      ) : stats ? (
        <div className="mb-6 flex flex-wrap gap-3">
          <StatCard label="Total Disbursements" value={String(stats.totalDisbursements)} />
          <StatCard
            label="Total Disbursed Amount"
            value={formatCurrencyCompact(stats.totalDisbursedAmount)}
          />
          <StatCard label="Submitted" value={String(stats.submitted)} />
          <StatCard label="Verified" value={String(stats.verified)} />
          <StatCard label="Processed" value={String(stats.processed)} />
          <StatCard label="Audited" value={String(stats.audited)} />
        </div>
      ) : null}

      <div className="rounded-lg border border-[var(--color-border)] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] p-4">
          <SearchInput
            id="disbursement-search"
            placeholder="Search for Disbursement"
            shortcut="⌘K"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            containerClassName="w-full max-w-md"
          />
          <div className="flex items-center gap-2">
            <div className="relative">
              <Button variant="outline" onClick={() => setSavedViewsOpen((open) => !open)} iconRight={<ChevronDown className="h-3.5 w-3.5" />}>
                {activeViewId ? savedViews.find((view) => view.id === activeViewId)?.name ?? 'Saved View' : 'Saved View'}
              </Button>
              {isSavedViewsOpen && (
                <>
                  <button aria-label="Close saved views" className="fixed inset-0 z-10 cursor-default" onClick={() => setSavedViewsOpen(false)} />
                  <div className="absolute right-0 z-20 mt-1 w-56 rounded-lg border border-[var(--color-border)] bg-white p-1 shadow-lg">
                    <button onClick={resetView} className="w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-50">Default view</button>
                    {savedViews.length === 0 ? <p className="px-3 py-2 text-sm text-[var(--color-text-muted)]">No saved views yet.</p> : savedViews.map((view) => (
                      <button key={view.id} onClick={() => { applySavedView(view.id); setSavedViewsOpen(false); }} className="w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-50">{view.name}</button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <Button variant="outline" onClick={exportRows} iconRight={<ChevronDown className="h-3.5 w-3.5" />}>Export All</Button>
          </div>
        </div>

        {state === 'loading' && <TableSkeleton />}
        {state === 'error' && (
          <ErrorState message={error ?? undefined} onRetry={refetch} />
        )}
        {state === 'empty' && <EmptyState onRetry={refetch} />}
        {state === 'success' && filteredData.length === 0 && (
          <EmptyState
            title="No matching disbursements"
            description="Try adjusting your search query to find what you're looking for."
          />
        )}
        {state === 'success' && paginatedData.length > 0 && (
          <>
            <DisbursementTable data={paginatedData} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={(rows: number) => {
                setRowsPerPage(rows);
                setCurrentPage(1);
              }}
            />
          </>
        )}
      </div>

      <ActivityDrawer
        isOpen={isActivityOpen}
        onClose={() => setActivityOpen(false)}
        entries={activityEntries}
      />

      <CreateViewModal
        isOpen={isCreateViewModalOpen}
        onClose={() => setCreateViewModalOpen(false)}
        onCreate={(name: string) => createView(name, pendingViewColumns)}
      />

      <AddDisbursementDrawer
        isOpen={isAddDisbursementOpen}
        onClose={() => setAddDisbursementOpen(false)}
        onSave={addDisbursement}
      />
    </div>
  );
}
