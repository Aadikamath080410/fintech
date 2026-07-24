import { useCallback, useEffect, useState } from 'react';
import { getLoanDetail, simulateDelay } from '../data/mockData';
import type { FetchState, LoanDetail } from '../types';
import { useDisbursementContext } from '../context/DisbursementContext';

export function useLoanDetail(loanId: string | undefined) {
  const { demoState } = useDisbursementContext();
  const [data, setData] = useState<LoanDetail | null>(null);
  const [state, setState] = useState<FetchState>('loading');
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!loanId) {
      setState('error');
      setError('No loan ID provided');
      return;
    }

    setState('loading');
    setError(null);

    try {
      await simulateDelay(600);

      if (demoState === 'error') {
        throw new Error(`Failed to load details for loan "${loanId}". Please try again.`);
      }

      if (demoState === 'empty') {
        setData(null);
        setState('empty');
        return;
      }

      if (demoState === 'loading') {
        return;
      }

      const loan = getLoanDetail(loanId);

      if (!loan) {
        setState('error');
        setError(`Loan "${loanId}" not found`);
        return;
      }

      setData(loan);
      setState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setState('error');
    }
  }, [loanId, demoState]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, state, error, refetch: fetchData };
}
