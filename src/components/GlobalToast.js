import { useEffect, useState } from 'react';
import { toastService } from '../utils/toast';

export default function GlobalToast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    return toastService.subscribe((toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter(t => t.id !== toast.id));
      }, 3000);
    });
  }, []);

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast show text-bg-${t.type} mb-2`}
        >
          <div className="toast-body">{t.message}</div>
        </div>
      ))}
    </div>
  );
}
