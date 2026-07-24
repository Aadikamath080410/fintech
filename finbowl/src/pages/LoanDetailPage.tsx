import {
  Archive,
  Clock,
  FileText,
  Pencil,
  Users,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ActivityDrawer } from '../components/activity/ActivityDrawer';
import {
  DataTable,
  DetailField,
  SectionCard,
  SectionNav,
} from '../components/loan/LoanSections';
import { LoanTypeBadge, PaidBadge, StatusBadge, TypeBadge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { StatCard } from '../components/ui/StatCard';
import { Toggle } from '../components/ui/Toggle';
import { ErrorState, LoanDetailSkeleton } from '../components/ui/States';
import { useLoanDetail } from '../hooks/useLoanDetail';
import { formatCurrency } from '../utils/formatters';

const SECTIONS = [
  { id: 'applicant-info', label: 'Applicant Information' },
  { id: 'loan-details', label: 'Loan Details' },
  { id: 'disbursements-info', label: 'Disbursements Information' },
  { id: 'commission', label: 'Commission' },
  { id: 'broker-info', label: 'Broker Information' },
  { id: 'additional-info', label: 'Additional Information' },
];

export function LoanDetailPage() {
  const { loanId } = useParams<{ loanId: string }>();
  const { data: loan, state, error, refetch } = useLoanDetail(loanId);
  const [showSummaryTiles, setShowSummaryTiles] = useState(true);
  const [activeSection, setActiveSection] = useState('applicant-info');
  const [isActivityOpen, setActivityOpen] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    if (state !== 'success' || !loan) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0,
      }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [state, loan]);

  if (state === 'loading') {
    return (
      <div className="p-6">
        <LoanDetailSkeleton />
      </div>
    );
  }

  if (state === 'error' || !loan) {
    return (
      <div className="p-6">
        <ErrorState
          message={error ?? 'Loan not found'}
          onRetry={refetch}
        />
        <div className="mt-4 text-center">
          <Link
            to="/rms/disbursement"
            className="text-sm text-[var(--color-link)] hover:underline"
          >
            ← Back to Disbursement
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* ── Page Header ───────────────────────────────────── */}
      <div className="mb-6">
        {/* Row 1: Loan ID (title) + Action buttons */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
              {loan.loanId}
            </h1>
            {/* Breadcrumb sits directly under the title */}
            <nav className="mt-1 flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
              <Link to="/" className="hover:text-[var(--color-text-secondary)] transition-colors">
                RMS
              </Link>
              <span className="select-none">›</span>
              <Link
                to="/rms/disbursement"
                className="hover:text-[var(--color-text-secondary)] transition-colors"
              >
                Loan
              </Link>
              <span className="select-none">›</span>
              <span className="font-medium text-[var(--color-primary)]">
                {loan.applicantName}
              </span>
            </nav>
          </div>

          {/* Right side: Summary Tiles toggle + action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Toggle
              checked={showSummaryTiles}
              onChange={setShowSummaryTiles}
              label="Summary Tiles"
            />
            <div className="h-5 w-px bg-[var(--color-border)]" aria-hidden />
            <Button variant="outline" icon={<Archive className="h-4 w-4" />}>
              Archive
            </Button>
            <Button
              variant="outline"
              icon={<Clock className="h-4 w-4" />}
              onClick={() => setActivityOpen(true)}
            >
              Activity Logs
            </Button>
            <Button variant="primary" icon={<Pencil className="h-4 w-4" />}>
              Edit Loan
            </Button>
          </div>
        </div>

        {/* Row 2: Applicant name + status badge + loan type */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-lg font-semibold text-[var(--color-text-primary)]">
            {loan.applicantName}
          </span>
          <StatusBadge status={loan.status} />
        </div>
        <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
          {loan.loanType}
        </p>
      </div>

      {/* ── Summary Stat Cards ─────────────────────────────── */}
      {showSummaryTiles && (
        <div className="mb-8 flex flex-wrap gap-3">
          <StatCard
            label="Total Sanctioned Amount"
            value={formatCurrency(loan.summary.totalSanctioned)}
          />
          <StatCard
            label="Total Disbursement Amount"
            value={formatCurrency(loan.summary.totalDisbursement)}
          />
          <StatCard
            label="Commission Income"
            value={formatCurrency(loan.summary.commissionIncome)}
          />
          <StatCard
            label="Referral Fee"
            value={formatCurrency(loan.summary.referralFee)}
          />
          <StatCard
            label="Net Income"
            value={formatCurrency(loan.summary.netIncome)}
            valueClassName="text-[var(--color-success)]"
          />
        </div>
      )}

      {/* ── Two-column layout: side-nav + section cards ───── */}
      <div className="flex gap-6">
        <SectionNav
          sections={SECTIONS}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />

        <div className="min-w-0 flex-1 space-y-4">
          <SectionCard
            id="applicant-info"
            title="Applicant Information"
            icon={<Users className="h-4 w-4 text-[var(--color-text-secondary)]" />}
          >
            <DataTable
              headers={['Name', 'Type', 'Email ID', 'Phone Number']}
              rows={loan.applicants.map((a) => [
                a.name,
                <TypeBadge key={a.name} type={a.type} />,
                a.email,
                a.phone,
              ])}
            />
          </SectionCard>

          <SectionCard id="loan-details" title="Loan Details">
            <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
              <DetailField label="Loan ID" value={loan.loanId} />
              <DetailField
                label="Loan Type"
                value={<LoanTypeBadge label={loan.loanType} />}
              />
              <DetailField label="Bank" value={loan.bank} />
              <DetailField label="Stage" value={loan.stage} />
            </div>

            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Sanction Details
            </h4>
            <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3">
              <DetailField label="Sanctioned Date" value={loan.sanctionedDate} />
              <DetailField
                label="Loan Sanctioned Amount"
                value={formatCurrency(loan.sanctionedAmount)}
                valueClassName="text-[var(--color-success)]"
              />
              <DetailField
                label="Verified Sanctioned Amount"
                value={formatCurrency(loan.verifiedSanctionedAmount)}
                valueClassName="text-[var(--color-success)]"
              />
            </div>

            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Team Details
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3">
              <DetailField label="Bank Executive Name" value={loan.bankExecutive} />
              <DetailField label="Credit Executive Details" value={loan.creditExecutive} />
              <DetailField label="Source" value={loan.source} />
            </div>
          </SectionCard>

          <SectionCard id="disbursements-info" title="Disbursements Information">
            <DataTable
              headers={[
                'Disbursement ID',
                'Disbursement Date',
                'Disbursement Amount',
                'Verified Disbursement Amount',
                'UTR Number',
                'Tranche',
                'Disbursement Status',
              ]}
              rows={loan.disbursements.map((d) => {
                const hasMismatch = d.amount !== d.verifiedAmount;
                const textColorClass = hasMismatch ? 'text-red-500 font-medium' : 'text-[var(--color-success)] font-medium';
                return [
                  d.id,
                  d.date,
                  <span key={`amt-${d.id}`} className={textColorClass}>
                    {formatCurrency(d.amount)}
                  </span>,
                  <span key={`vamt-${d.id}`} className={textColorClass}>
                    {formatCurrency(d.verifiedAmount)}
                  </span>,
                  d.utrNumber,
                  d.tranche,
                  <StatusBadge key={`status-${d.id}`} status={d.status} />,
                ];
              })}
            />
          </SectionCard>

          <SectionCard
            id="commission"
            title="Commission"
            badge={
              <span className="ml-2 rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                Total Commission : ₹2,20,640.00
              </span>
            }
          >
            <DataTable
              headers={[
                'Party Name (Lead Code)',
                'Sub-Code Commission (Net) %',
                'Gross Commission %',
                'Commission Amount',
                'Invoice No',
                'Invoice Status',
              ]}
              rows={loan.commissions.map((c) => [
                c.partyName,
                `${c.subCodeCommission.toFixed(4)}%`,
                `${c.grossCommission.toFixed(4)}%`,
                <span key={`comm-${c.invoiceNo}`} className="text-[var(--color-success)] font-medium">
                  {formatCurrency(c.commissionAmount)}
                </span>,
                <a
                  key={`inv-${c.invoiceNo}`}
                  href="#"
                  className="font-medium text-[var(--color-link)] hover:underline"
                >
                  {c.invoiceNo}
                </a>,
                <PaidBadge key={`paid-${c.invoiceNo}`} status={c.invoiceStatus} />,
              ])}
            />
          </SectionCard>

          <SectionCard
            id="broker-info"
            title="Broker Information"
            badge={
              <span className="ml-2 rounded bg-pink-50 px-2 py-0.5 text-xs font-semibold text-pink-700">
                Total referral fee: ₹8,640
              </span>
            }
          >
            <DataTable
              headers={[
                'Broker Name / Code',
                'Broker Commission %',
                'Referral Fee',
                'PO No & Date',
                'PO Status',
              ]}
              rows={loan.brokers.map((b) => [
                b.brokerName,
                `${b.brokerCommission.toFixed(4)}%`,
                formatCurrency(b.referralFee),
                <div key={`po-container-${b.poNo}`} className="flex flex-col">
                  <a
                    href="#"
                    className="font-medium text-pink-600 hover:text-pink-700 hover:underline text-sm"
                  >
                    {b.poNo}
                  </a>
                  <span className="text-[11px] text-[var(--color-text-muted)] font-normal">{b.poDate}</span>
                </div>,
                <PaidBadge key={`po-status-${b.poNo}`} status={b.poStatus} />,
              ])}
            />
          </SectionCard>

          <SectionCard id="additional-info" title="Notes / Additional Information">
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {loan.notes}
            </p>
          </SectionCard>

          <SectionCard
            title="Documents"
            icon={<FileText className="h-4 w-4 text-[var(--color-text-secondary)]" />}
          >
            {loan.documents.length === 0 ? (
              <p className="py-4 text-center text-sm text-[var(--color-text-muted)]">
                No documents uploaded yet.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {loan.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-red-50">
                      <FileText className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                        {doc.name}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">{doc.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>
      </div>

      <ActivityDrawer
        isOpen={isActivityOpen}
        onClose={() => setActivityOpen(false)}
        entries={loan.activityLog}
      />
    </div>
  );
}
