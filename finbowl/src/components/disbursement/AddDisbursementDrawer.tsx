import { X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type { Disbursement, DisbursementStatus } from '../../types';
import { Button } from '../ui/Button';

interface AddDisbursementDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: Disbursement) => void;
}

const BANKS = [
  'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'State Bank of India',
  'Kotak Mahindra Bank', 'Punjab National Bank', 'Canara Bank',
  'Bank of Baroda', 'Union Bank of India', 'IDFC FIRST Bank',
];

const LOAN_TYPES = ['Home Loan', 'Personal Loan', 'Business Loan', 'Education Loan', 'Vehicle Loan'];
const STAGES = ['Lead', 'Applied', 'In Review', 'Sanctioned', 'Disbursed'];
const STATUSES: DisbursementStatus[] = ['Draft', 'Submitted', 'Verified', 'Processed', 'Audited'];
const TRANCHES = ['Full', 'Part - 1', 'Part - 2', 'Part - 3'];

const AVATARS = [
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
];

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-secondary)]">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all';

const selectCls = inputCls + ' cursor-pointer';

export function AddDisbursementDrawer({ isOpen, onClose, onSave }: AddDisbursementDrawerProps) {
  const [form, setForm] = useState({
    applicantName: '',
    bankName: '',
    loanType: 'Home Loan',
    stage: 'Lead',
    status: 'Draft' as DisbursementStatus,
    disbursementDate: '',
    sanctionedAmt: '',
    disbursedAmt: '',
    verifiedAmt: '',
    referralPercent: '',
    utrNumber: '',
    tranche: 'Full',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.applicantName.trim()) e.applicantName = 'Required';
    if (!form.bankName) e.bankName = 'Required';
    if (!form.disbursementDate) e.disbursementDate = 'Required';
    if (!form.sanctionedAmt || isNaN(Number(form.sanctionedAmt))) e.sanctionedAmt = 'Enter a valid amount';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const loanId = `LN${String(Math.floor(Math.random() * 900) + 100)}-24-${String(Date.now()).slice(-4)}`;
    const newRecord: Disbursement = {
      id: crypto.randomUUID(),
      disbursementDate: form.disbursementDate,
      loanId,
      status: form.status,
      applicantName: form.applicantName.trim(),
      bankName: form.bankName,
      loanType: form.loanType,
      sanctionedAmt: Number(form.sanctionedAmt) || null,
      disbursedAmt: Number(form.disbursedAmt) || null,
      balancedAmt: Number(form.sanctionedAmt) - Number(form.disbursedAmt) || null,
      verifiedAmt: Number(form.verifiedAmt) || null,
      referralPercent: Number(form.referralPercent) || null,
      creditExecutive: { name: form.applicantName.trim(), avatar: AVATARS[0] },
      bankExecutive: { name: 'Assigned', avatar: AVATARS[1] },
    };

    onSave(newRecord);
    // Reset form
    setForm({
      applicantName: '',
      bankName: '',
      loanType: 'Home Loan',
      stage: 'Lead',
      status: 'Draft',
      disbursementDate: '',
      sanctionedAmt: '',
      disbursedAmt: '',
      verifiedAmt: '',
      referralPercent: '',
      utrNumber: '',
      tranche: 'Full',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 z-50 flex w-[520px] max-w-full flex-col bg-white shadow-2xl"
        style={{ animation: 'slideInRight 0.22s ease-out' }}
        role="dialog"
        aria-modal="true"
        aria-label="Add Disbursement"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Add Disbursement
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Fill in the details below to create a new disbursement record.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[var(--color-text-muted)] hover:bg-gray-100 hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable form body */}
        <form id="add-disbursement-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Section: Applicant & Loan */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Loan Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Field label="Applicant Name" required>
                  <input
                    className={inputCls}
                    placeholder="e.g. Rahul Verma"
                    value={form.applicantName}
                    onChange={set('applicantName')}
                  />
                  {errors.applicantName && (
                    <p className="mt-1 text-xs text-red-500">{errors.applicantName}</p>
                  )}
                </Field>
              </div>

              <Field label="Bank" required>
                <select className={selectCls} value={form.bankName} onChange={set('bankName')}>
                  <option value="">Select bank</option>
                  {BANKS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {errors.bankName && (
                  <p className="mt-1 text-xs text-red-500">{errors.bankName}</p>
                )}
              </Field>

              <Field label="Loan Type">
                <select className={selectCls} value={form.loanType} onChange={set('loanType')}>
                  {LOAN_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field label="Stage">
                <select className={selectCls} value={form.stage} onChange={set('stage')}>
                  {STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>

              <Field label="Status">
                <select className={selectCls} value={form.status} onChange={set('status')}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>

              <div className="col-span-2">
                <Field label="Sanctioned Amount (₹)" required>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className={inputCls}
                    placeholder="e.g. 4800000"
                    value={form.sanctionedAmt}
                    onChange={set('sanctionedAmt')}
                  />
                  {errors.sanctionedAmt && (
                    <p className="mt-1 text-xs text-red-500">{errors.sanctionedAmt}</p>
                  )}
                </Field>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-[var(--color-border)]" />

          {/* Section: Disbursement Details */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Disbursement Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Field label="Disbursement Date" required>
                  <input
                    type="date"
                    className={inputCls}
                    value={form.disbursementDate}
                    onChange={set('disbursementDate')}
                  />
                  {errors.disbursementDate && (
                    <p className="mt-1 text-xs text-red-500">{errors.disbursementDate}</p>
                  )}
                </Field>
              </div>

              <Field label="Disbursement Amount (₹)">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className={inputCls}
                  placeholder="e.g. 4275000"
                  value={form.disbursedAmt}
                  onChange={set('disbursedAmt')}
                />
              </Field>

              <Field label="Verified Amount (₹)">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className={inputCls}
                  placeholder="e.g. 4275000"
                  value={form.verifiedAmt}
                  onChange={set('verifiedAmt')}
                />
              </Field>

              <Field label="UTR Number">
                <input
                  className={inputCls}
                  placeholder="e.g. 42675893247"
                  value={form.utrNumber}
                  onChange={set('utrNumber')}
                />
              </Field>

              <Field label="Tranche">
                <select className={selectCls} value={form.tranche} onChange={set('tranche')}>
                  {TRANCHES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </Field>

              <Field label="Referral %">
                <input
                  type="number"
                  min="0"
                  step="0.0001"
                  className={inputCls}
                  placeholder="e.g. 0.75"
                  value={form.referralPercent}
                  onChange={set('referralPercent')}
                />
              </Field>
            </div>
          </div>
        </form>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] bg-gray-50/60 px-6 py-4">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="add-disbursement-form">
            Save Disbursement
          </Button>
        </div>
      </div>
    </>
  );
}
