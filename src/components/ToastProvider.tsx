import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Alert, Snackbar } from '@mui/material';
import type { AlertColor } from '@mui/material';

type Toast = {
  message: string;
  severity: AlertColor;
  durationMs?: number;
};

type ToastContextValue = {
  showToast: (toast: Toast) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within <ToastProvider />');
  }
  return ctx;
}

interface ToastProviderProps {
  children: ReactNode;
}


//  ToastProvider
export default function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [open, setOpen] = useState(false);

  const showToast = useCallback((next: Toast) => {
    // Close → reopen pattern prevents “same message doesn’t show twice” quirks.
    setOpen(false);
    setToast(next);
    setTimeout(() => setOpen(true), 0);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={toast?.durationMs ?? 3500}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={toast?.severity ?? 'info'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast?.message ?? ''}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

