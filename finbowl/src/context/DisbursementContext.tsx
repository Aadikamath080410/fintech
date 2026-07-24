import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ColumnKey, Disbursement, SavedView } from '../types';

const DEFAULT_VISIBLE_COLUMNS: ColumnKey[] = [
  'disbursementDate',
  'loanId',
  'status',
  'applicantName',
  'bankName',
  'sanctionedAmt',
  'verifiedAmt',
  'referralPercent',
  'creditExecutive',
  'bankExecutive',
];

interface DisbursementContextValue {
  visibleColumns: ColumnKey[];
  setVisibleColumns: (columns: ColumnKey[]) => void;
  toggleColumn: (key: ColumnKey) => void;
  savedViews: SavedView[];
  activeViewId: string | null;
  setActiveViewId: (id: string | null) => void;
  applySavedView: (id: string) => void;
  createView: (name: string, columns: ColumnKey[]) => void;
  selectedRows: Set<string>;
  toggleRowSelection: (id: string) => void;
  toggleAllRows: (ids: string[]) => void;
  clearSelection: () => void;
  isActivityOpen: boolean;
  setActivityOpen: (open: boolean) => void;
  isColumnSelectorOpen: boolean;
  setColumnSelectorOpen: (open: boolean) => void;
  isCreateViewModalOpen: boolean;
  setCreateViewModalOpen: (open: boolean) => void;
  pendingViewColumns: ColumnKey[];
  setPendingViewColumns: (columns: ColumnKey[]) => void;
  demoState: 'success' | 'loading' | 'error' | 'empty';
  setDemoState: (state: 'success' | 'loading' | 'error' | 'empty') => void;
  isAddDisbursementOpen: boolean;
  setAddDisbursementOpen: (open: boolean) => void;
  extraDisbursements: Disbursement[];
  addDisbursement: (record: Disbursement) => void;
}

const DisbursementContext = createContext<DisbursementContextValue | null>(null);

export function DisbursementProvider({ children }: { children: ReactNode }) {
  const [visibleColumns, setVisibleColumns] =
    useState<ColumnKey[]>(DEFAULT_VISIBLE_COLUMNS);
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const [activeViewId, setActiveViewId] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isActivityOpen, setActivityOpen] = useState(false);
  const [isColumnSelectorOpen, setColumnSelectorOpen] = useState(false);
  const [isCreateViewModalOpen, setCreateViewModalOpen] = useState(false);
  const [pendingViewColumns, setPendingViewColumns] =
    useState<ColumnKey[]>(DEFAULT_VISIBLE_COLUMNS);
  const [demoState, setDemoState] =
    useState<'success' | 'loading' | 'error' | 'empty'>('success');
  const [isAddDisbursementOpen, setAddDisbursementOpen] = useState(false);
  const [extraDisbursements, setExtraDisbursements] = useState<Disbursement[]>([]);

  const addDisbursement = useCallback((record: Disbursement) => {
    setExtraDisbursements((prev) => [record, ...prev]);
  }, []);

  const toggleColumn = useCallback((key: ColumnKey) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key],
    );
  }, []);

  const createView = useCallback((name: string, columns: ColumnKey[]) => {
    const newView: SavedView = {
      id: crypto.randomUUID(),
      name,
      visibleColumns: columns,
    };
    setSavedViews((prev) => [...prev, newView]);
    setActiveViewId(newView.id);
    setVisibleColumns(columns);
    setCreateViewModalOpen(false);
  }, []);

  const applySavedView = useCallback((id: string) => {
    const view = savedViews.find((item) => item.id === id);
    if (!view) return;
    setActiveViewId(view.id);
    setVisibleColumns(view.visibleColumns as ColumnKey[]);
  }, [savedViews]);

  const toggleRowSelection = useCallback((id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAllRows = useCallback((ids: string[]) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      const everyVisibleRowSelected = ids.every((id) => next.has(id));
      ids.forEach((id) => {
        if (everyVisibleRowSelected) next.delete(id);
        else next.add(id);
      });
      return next;
    });
  }, []);

  const clearSelection = useCallback(() => setSelectedRows(new Set()), []);

  const value = useMemo(
    () => ({
      visibleColumns,
      setVisibleColumns,
      toggleColumn,
      savedViews,
      activeViewId,
      setActiveViewId,
      applySavedView,
      createView,
      selectedRows,
      toggleRowSelection,
      toggleAllRows,
      clearSelection,
      isActivityOpen,
      setActivityOpen,
      isColumnSelectorOpen,
      setColumnSelectorOpen,
      isCreateViewModalOpen,
      setCreateViewModalOpen,
      pendingViewColumns,
      setPendingViewColumns,
      demoState,
      setDemoState,
      isAddDisbursementOpen,
      setAddDisbursementOpen,
      extraDisbursements,
      addDisbursement,
    }),
    [
      visibleColumns,
      toggleColumn,
      savedViews,
      activeViewId,
      applySavedView,
      createView,
      selectedRows,
      toggleRowSelection,
      toggleAllRows,
      clearSelection,
      isActivityOpen,
      isColumnSelectorOpen,
      isCreateViewModalOpen,
      pendingViewColumns,
      demoState,
      isAddDisbursementOpen,
      extraDisbursements,
      addDisbursement,
    ],
  );

  return (
    <DisbursementContext.Provider value={value}>
      {children}
    </DisbursementContext.Provider>
  );
}

export function useDisbursementContext() {
  const ctx = useContext(DisbursementContext);
  if (!ctx) {
    throw new Error('useDisbursementContext must be used within DisbursementProvider');
  }
  return ctx;
}
