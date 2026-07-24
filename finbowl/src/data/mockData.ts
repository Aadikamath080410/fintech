import type {
  ActivityLogEntry,
  Applicant,
  BrokerRecord,
  CommissionRecord,
  Disbursement,
  DisbursementRecord,
  DisbursementStats,
  LoanDetail,
} from '../types';

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', // Women 1
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', // Men 1
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', // Women 2
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', // Men 2
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100', // Women 3
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100', // Men 3
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', // Women 4
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100', // Men 4
];

export const DISBURSEMENT_STATS: DisbursementStats = {
  totalDisbursements: 8,
  totalDisbursedAmount: 36250000,
  submitted: 12,
  verified: 1,
  processed: 5,
  audited: 12,
};

export const DISBURSEMENTS: Disbursement[] = [
  {
    id: '1',
    disbursementDate: '2024-04-30',
    loanId: 'LN002-24-1001',
    status: 'Draft',
    applicantName: 'Arjun Mehta',
    bankName: 'HDFC Bank',
    loanType: 'Home Loan',
    sanctionedAmt: 7500.00,
    disbursedAmt: null,
    balancedAmt: 7500.00,
    verifiedAmt: 700000,
    referralPercent: 0.1500,
    creditExecutive: { name: 'Arjun Mehta', avatar: AVATARS[1] },
    bankExecutive: { name: 'Siddharth', avatar: AVATARS[5] },
  },
  {
    id: '2',
    disbursementDate: '2024-09-30',
    loanId: 'LN003-24-1002',
    status: 'Submitted',
    applicantName: 'Mohit Agarwal',
    bankName: 'ICICI Bank',
    loanType: 'Home Loan',
    sanctionedAmt: 12000.00,
    disbursedAmt: null,
    balancedAmt: 12000.00,
    verifiedAmt: null,
    referralPercent: 0.2500,
    creditExecutive: { name: 'Mohit Agarwal', avatar: AVATARS[3] },
    bankExecutive: { name: 'Tonvi M', avatar: AVATARS[0] },
  },
  {
    id: '3',
    disbursementDate: '2027-05-12',
    loanId: 'LN004-24-1003',
    status: 'Submitted',
    applicantName: 'Priya Singh',
    bankName: 'Axis Bank',
    loanType: 'Home Loan',
    sanctionedAmt: 15000.00,
    disbursedAmt: null,
    balancedAmt: 15000.00,
    verifiedAmt: null,
    referralPercent: 0.3500,
    creditExecutive: { name: 'Priya Singh', avatar: AVATARS[2] },
    bankExecutive: { name: 'Deepa', avatar: AVATARS[4] },
  },
  {
    id: '4',
    disbursementDate: '2024-01-15',
    loanId: 'LN005-24-1004',
    status: 'Submitted',
    applicantName: 'Simran Anand',
    bankName: 'State Bank of India',
    loanType: 'Home Loan',
    sanctionedAmt: 22000.00,
    disbursedAmt: null,
    balancedAmt: 22000.00,
    verifiedAmt: null,
    referralPercent: 0.4500,
    creditExecutive: { name: 'Simran Anand', avatar: AVATARS[6] },
    bankExecutive: { name: 'Suresh', avatar: AVATARS[7] },
  },
  {
    id: '5',
    disbursementDate: '2024-02-20',
    loanId: 'LN006-24-1005',
    status: 'Submitted',
    applicantName: 'Ravi Sharma',
    bankName: 'Kotak Mahindra Bank',
    loanType: 'Home Loan',
    sanctionedAmt: 30000.00,
    disbursedAmt: null,
    balancedAmt: 30000.00,
    verifiedAmt: null,
    referralPercent: 0.5500,
    creditExecutive: { name: 'Ravi Sharma', avatar: AVATARS[1] },
    bankExecutive: { name: 'Rahul V', avatar: AVATARS[3] },
  },
  {
    id: '6',
    disbursementDate: '2024-02-20',
    loanId: 'LN007-24-1006',
    status: 'Submitted',
    applicantName: 'Sneha Joshi',
    bankName: 'Punjab National Bank',
    loanType: 'Home Loan',
    sanctionedAmt: 40000.00,
    disbursedAmt: null,
    balancedAmt: 40000.00,
    verifiedAmt: null,
    referralPercent: 0.6500,
    creditExecutive: { name: 'Sneha Joshi', avatar: AVATARS[4] },
    bankExecutive: { name: 'Pooja S', avatar: AVATARS[2] },
  },
  {
    id: '7',
    disbursementDate: '2024-02-20',
    loanId: 'LN001-24-1004',
    status: 'Verified',
    applicantName: 'Vikram Desai',
    bankName: 'Canara Bank',
    loanType: 'Home Loan',
    sanctionedAmt: 55000.00,
    disbursedAmt: null,
    balancedAmt: 55000.00,
    verifiedAmt: 1578901,
    referralPercent: 0.7500,
    creditExecutive: { name: 'Vikram Desai', avatar: AVATARS[3] },
    bankExecutive: { name: 'Manish', avatar: AVATARS[7] },
  },
  {
    id: '8',
    disbursementDate: '2024-02-20',
    loanId: 'LN008-24-1007',
    status: 'Audited',
    applicantName: 'Anjali Rao',
    bankName: 'Bank of Baroda',
    loanType: 'Home Loan',
    sanctionedAmt: 75000.00,
    disbursedAmt: null,
    balancedAmt: 75000.00,
    verifiedAmt: 1689012,
    referralPercent: 0.8500,
    creditExecutive: { name: 'Anjali Rao', avatar: AVATARS[0] },
    bankExecutive: { name: 'Kavita I', avatar: AVATARS[4] },
  },
  {
    id: '9',
    disbursementDate: '2024-02-20',
    loanId: 'LN009-24-1008',
    status: 'Audited',
    applicantName: 'Karan Iyer',
    bankName: 'Union Bank of India',
    loanType: 'Home Loan',
    sanctionedAmt: 90000.00,
    disbursedAmt: null,
    balancedAmt: 90000.00,
    verifiedAmt: 1700123,
    referralPercent: 0.9500,
    creditExecutive: { name: 'Karan Iyer', avatar: AVATARS[5] },
    bankExecutive: { name: 'Ankit P', avatar: AVATARS[1] },
  },
  {
    id: '10',
    disbursementDate: '2024-02-20',
    loanId: 'LN010-24-1009',
    status: 'Verified',
    applicantName: 'Neha Gupta',
    bankName: 'IDFC FIRST Bank',
    loanType: 'Home Loan',
    sanctionedAmt: 130000.00,
    disbursedAmt: null,
    balancedAmt: 130000.00,
    verifiedAmt: 1811234,
    referralPercent: 1.1500,
    creditExecutive: { name: 'Neha Gupta', avatar: AVATARS[6] },
    bankExecutive: { name: 'Ritika M', avatar: AVATARS[2] },
  },
];

const APPLICANTS: Applicant[] = [
  {
    name: 'Rahul Verma',
    type: 'Applicant',
    email: 'rahul.verma@gmail.com',
    phone: '+91 9876543210',
  },
  {
    name: 'Priya Sharma',
    type: 'Co-Applicant',
    email: 'priya.sharma@gmail.com',
    phone: '+91 9123456789',
  },
  {
    name: 'Neha Gupta',
    type: 'Co-Applicant',
    email: 'neha.gupta@gmail.com',
    phone: '+91 9988776655',
  },
];

const DISBURSEMENT_RECORDS: DisbursementRecord[] = [
  {
    id: 'DB002-24-1001',
    date: '22-11-2024',
    amount: 480000.00,
    verifiedAmount: 480000.00,
    utrNumber: '42675893247',
    tranche: 'Full',
    status: 'Processed',
  },
  {
    id: 'DB002-24-1001',
    date: '23-11-2024',
    amount: 525000.00,
    verifiedAmount: 525000.00,
    utrNumber: '42675893248',
    tranche: 'Full',
    status: 'Processed',
  },
  {
    id: 'DB002-24-1001',
    date: '24-11-2024',
    amount: 800000.00,
    verifiedAmount: 800000.00,
    utrNumber: '42675893249',
    tranche: 'Full',
    status: 'Processed',
  },
  {
    id: 'DB002-24-1001',
    date: '25-11-2024',
    amount: 875000.00, // Show in red since it mismatches
    verifiedAmount: 700000.00, // Show in red since it mismatches
    utrNumber: '42675893250',
    tranche: 'Full',
    status: 'Processed',
  },
];

const COMMISSIONS: CommissionRecord[] = [
  {
    partyName: 'Amit Sharma',
    subCodeCommission: 0.7500,
    grossCommission: 0.7500,
    commissionAmount: 3400.00,
    invoiceNo: 'RMS-INV-2026-00156',
    invoiceStatus: 'Paid',
  },
  {
    partyName: 'Anjali Mehta',
    subCodeCommission: 0.8500,
    grossCommission: 1.2500,
    commissionAmount: 4200.00,
    invoiceNo: 'RMS-INV-2026-00157',
    invoiceStatus: 'Paid',
  },
  {
    partyName: 'Kapil Kumar',
    subCodeCommission: 0.8000,
    grossCommission: 1.5000,
    commissionAmount: 3000.00,
    invoiceNo: 'RMS-INV-2026-00158',
    invoiceStatus: 'Paid',
  },
  {
    partyName: 'Sneha Iyer',
    subCodeCommission: 1.0000,
    grossCommission: 2.0000,
    commissionAmount: 9300.00,
    invoiceNo: 'RMS-INV-2026-00159',
    invoiceStatus: 'Paid',
  },
];

const BROKERS: BrokerRecord[] = [
  {
    brokerName: 'Amit Sharma CON-301',
    brokerCommission: 0.7500,
    referralFee: 3020.00,
    poNo: 'RMS-PO-2026-00089',
    poDate: '22-11-2024',
    poStatus: 'Paid',
  },
  {
    brokerName: 'Ravi Patel CON-302',
    brokerCommission: 0.8500,
    referralFee: 2875.00,
    poNo: 'RMS-PO-2026-00090',
    poDate: '23-11-2024',
    poStatus: 'Paid',
  },
  {
    brokerName: 'Amit Sharma CON-301',
    brokerCommission: 0.9000,
    referralFee: 2800.00,
    poNo: 'RMS-PO-2026-00091',
    poDate: '24-11-2024',
    poStatus: 'Paid',
  },
  {
    brokerName: 'Sita Verma CON-303',
    brokerCommission: 1.0000,
    referralFee: 3150.00,
    poNo: 'RMS-PO-2026-00092',
    poDate: '24-11-2024',
    poStatus: 'Paid',
  },
];

const ACTIVITY_LOG: ActivityLogEntry[] = [
  {
    id: '1',
    action: 'Loan Created',
    user: 'Amit Sharma',
    avatar: AVATARS[1],
    timestamp: '20 May (9:20 AM)',
  },
  {
    id: '2',
    action: 'Status Updated',
    user: 'Amit Sharma',
    avatar: AVATARS[1],
    timestamp: '20 May (9:20 AM)',
    change: {
      label: 'Status',
      from: 'Verified',
      to: 'Processed',
      fromBadge: 'Verified',
      toBadge: 'Processed',
    },
  },
  {
    id: '3',
    action: 'Updated',
    user: 'Amit Sharma',
    avatar: AVATARS[1],
    timestamp: '20 May (9:20 AM)',
    change: {
      label: 'Disbursed Amount',
      from: '₹30,00,000.00',
      to: '₹31,00,000.00',
    },
  },
];

export const LOAN_DETAILS: Record<string, LoanDetail> = {
  'LN002-24-1001': {
    loanId: 'Loan - 2026-04892',
    applicantName: 'Rahul Verma',
    loanType: 'Home Loan',
    status: 'Processed',
    bank: 'HDFC Bank - (Adyar Branch)',
    stage: 'Lead',
    sanctionedDate: '22/11/2024',
    sanctionedAmount: 480000,
    verifiedSanctionedAmount: 480000,
    bankExecutive: 'Amit Sharma',
    creditExecutive: 'Preethi Sharma',
    source: 'Ramesh Kumar',
    summary: {
      totalSanctioned: 480000,
      totalDisbursement: 4275000,
      commissionIncome: 52450,
      referralFee: 18750,
      netIncome: 71200,
    },
    applicants: APPLICANTS,
    disbursements: DISBURSEMENT_RECORDS,
    commissions: COMMISSIONS,
    brokers: BROKERS,
    notes:
      'Party applied for a home loan for property purchase in Chennai. Documents verified successfully and income proof has been submitted. Awaiting final bank approval and disbursement confirmation.',
    documents: [
      { name: 'Invoicea.pdf', size: '500 KB' },
      { name: 'Invoiceb.pdf', size: '500 KB' },
      { name: 'Invoicec.pdf', size: '500 KB' },
      { name: 'Invoiced.pdf', size: '500 KB' },
    ],
    activityLog: ACTIVITY_LOG,
  },
};

export function getLoanDetail(loanId: string): LoanDetail | null {
  // Find matching disbursement in DISBURSEMENTS list to make detail navigation dynamic
  const formattedId = loanId.includes('LN') ? loanId : 'LN002-24-1001';
  const disbursement = DISBURSEMENTS.find((d) => d.loanId === formattedId) || DISBURSEMENTS[0];
  const baseDetail = LOAN_DETAILS['LN002-24-1001'];
  if (!baseDetail) return null;

  return {
    ...baseDetail,
    loanId: `Loan - 2026-${disbursement.loanId.split('-')[2] || '04892'}`,
    applicantName: disbursement.applicantName,
    status: disbursement.status,
    bank: `${disbursement.bankName} - (Adyar Branch)`,
    applicants: [
      {
        name: disbursement.applicantName,
        type: 'Applicant',
        email: `${disbursement.applicantName.toLowerCase().replace(' ', '.')}@gmail.com`,
        phone: '+91 9876543210',
      },
      ...APPLICANTS.slice(1),
    ],
  };
}

export function simulateDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
