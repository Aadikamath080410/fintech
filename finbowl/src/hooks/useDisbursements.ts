import { useCallback, useEffect, useState } from 'react';
import {
  DISBURSEMENTS,
  DISBURSEMENT_STATS,
  simulateDelay,
} from '../data/mockData';
import type { Disbursement, DisbursementStats, FetchState } from '../types';
import { useDisbursementContext } from '../context/DisbursementContext';

export function useDisbursements() {
  const { demoState, extraDisbursements } = useDisbursementContext();
  const [data, setData] = useState<Disbursement[]>([]);
  const [stats, setStats] = useState<DisbursementStats | null>(null);
  const [state, setState] = useState<FetchState>('loading');
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setState('loading');
    setError(null);

    try {
      await simulateDelay(600);

      if (demoState === 'error') {
        throw new Error('Failed to load disbursements. Please try again.');
      }

      if (demoState === 'empty') {
        setData([]);
        setStats({
          totalDisbursements: 0,
          totalDisbursedAmount: 0,
          submitted: 0,
          verified: 0,
          processed: 0,
          audited: 0,
        });
        setState('empty');
        return;
      }

      if (demoState === 'loading') {
        // Keep in loading state for showcase
        return;
      }

      const allDisbursements = [...extraDisbursements, ...DISBURSEMENTS];
      const additionalStats = extraDisbursements.reduce(
        (totals, record) => ({
          totalDisbursements: totals.totalDisbursements + 1,
          totalDisbursedAmount: totals.totalDisbursedAmount + (record.disbursedAmt ?? 0),
          submitted: totals.submitted + (record.status === 'Submitted' ? 1 : 0),
          verified: totals.verified + (record.status === 'Verified' ? 1 : 0),
          processed: totals.processed + (record.status === 'Processed' ? 1 : 0),
          audited: totals.audited + (record.status === 'Audited' ? 1 : 0),
        }),
        DISBURSEMENT_STATS,
      );
      setData(allDisbursements);
      setStats(additionalStats);
      setState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setState('error');
    }
  }, [demoState, extraDisbursements]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, stats, state, error, refetch: fetchData };
}
