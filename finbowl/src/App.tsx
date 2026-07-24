import { Navigate, Route, Routes } from 'react-router-dom';
import { DisbursementProvider } from './context/DisbursementContext';
import { AppLayout } from './components/layout/AppLayout';
import { DisbursementPage } from './pages/DisbursementPage';
import { LoanDetailPage } from './pages/LoanDetailPage';

function App() {
  return (
    <DisbursementProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/rms/disbursement" replace />} />
          <Route path="rms/disbursement" element={<DisbursementPage />} />
          <Route path="rms/disbursement/:loanId" element={<LoanDetailPage />} />
        </Route>
      </Routes>
    </DisbursementProvider>
  );
}

export default App;
