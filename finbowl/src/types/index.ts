export type DisbursementStatus = 'Draft' | 'Submitted' | 'Verified' | 'Processed' | 'Audited';

export interface Disbursement {
  id: string;
  disbursementDate: string;
  loanId: string;
  status: DisbursementStatus;
  applicantName: string;
  bankName: string;
  loanType: string;
  sanctionedAmt: number | null;
  disbursedAmt: number | null;
  balancedAmt: number | null;
  verifiedAmt: number | null;
  referralPercent: number | null;
  creditExecutive: { name: string; avatar: string };
  bankExecutive: { name: string; avatar: string };
}

export interface DisbursementStats {
  totalDisbursements: number;
  totalDisbursedAmount: number;
  submitted: number;
  verified: number;
  processed: number;
  audited: number;
}

export interface SavedView {
  id: string;
  name: string;
  visibleColumns: string[];
}

export interface Applicant {
  name: string;
  type: 'Applicant' | 'Co-Applicant';
  email: string;
  phone: string;
}

export interface DisbursementRecord {
  id: string;
  date: string;
  amount: number;
  verifiedAmount: number;
  utrNumber: string;
  tranche: string;
  status: DisbursementStatus;
}

export interface CommissionRecord {
  partyName: string;
  subCodeCommission: number;
  grossCommission: number;
  commissionAmount: number;
  invoiceNo: string;
  invoiceStatus: 'Paid' | 'Pending';
}

export interface BrokerRecord {
  brokerName: string;
  brokerCommission: number;
  referralFee: number;
  poNo: string;
  poDate: string;
  poStatus: 'Paid' | 'Pending';
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  user: string;
  avatar: string;
  timestamp: string;
  change?: {
    label: string;
    from: string;
    to: string;
    fromBadge?: DisbursementStatus;
    toBadge?: DisbursementStatus;
  };
}

export interface LoanDetail {
  loanId: string;
  applicantName: string;
  loanType: string;
  status: DisbursementStatus;
  bank: string;
  stage: string;
  sanctionedDate: string;
  sanctionedAmount: number;
  verifiedSanctionedAmount: number;
  bankExecutive: string;
  creditExecutive: string;
  source: string;
  summary: {
    totalSanctioned: number;
    totalDisbursement: number;
    commissionIncome: number;
    referralFee: number;
    netIncome: number;
  };
  applicants: Applicant[];
  disbursements: DisbursementRecord[];
  commissions: CommissionRecord[];
  brokers: BrokerRecord[];
  notes: string;
  documents: { name: string; size: string }[];
  activityLog: ActivityLogEntry[];
}

export type ColumnKey =
  | 'disbursementDate'
  | 'loanId'
  | 'status'
  | 'applicantName'
  | 'bankName'
  | 'loanType'
  | 'sanctionedAmt'
  | 'disbursedAmt'
  | 'balancedAmt'
  | 'verifiedAmt'
  | 'referralPercent'
  | 'creditExecutive'
  | 'bankExecutive';

export interface ColumnDefinition {
  key: ColumnKey;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}

export type FetchState = 'idle' | 'loading' | 'success' | 'error' | 'empty';
