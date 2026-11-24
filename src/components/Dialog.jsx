import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

export default function Dialog({ title, className = '', children, onClose }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    const trigger = document.activeElement;
    dialog.showModal();

    return () => {
      dialog.close();
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus();
    };
  }, []);

  function dismiss(event) {
    event.preventDefault();
    onClose();
  }

  return (
    <dialog ref={ref} className={`dialog ${className}`} aria-labelledby={titleId} onCancel={dismiss}>
      <div className="dialog-header">
        <h2 id={titleId}>{title}</h2>
        <button className="icon-button" type="button" aria-label="Close dialog" onClick={onClose}><X aria-hidden="true" /></button>
      </div>
      {children}
    </dialog>
  );
}
