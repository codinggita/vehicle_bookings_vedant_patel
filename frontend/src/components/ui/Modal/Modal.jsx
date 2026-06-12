import { useEffect } from 'react';
import { createPortal } from 'react-dom';


/**
 * Reusable Modal / Dialog Component using React Portals
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Determines if modal is visible
 * @param {Function} props.onClose - Triggered when modal requests to close
 * @param {string} [props.title] - Modal heading
 * @param {React.ReactNode} props.children - Inner contents
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children
}) {
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scrolling when modal is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // Handle ESC key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-xl shadow-xl border border-slate-100 flex flex-col max-h-[90vh] transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 
            id="modal-title" 
            className="text-lg font-semibold text-slate-800"
          >
            {title || 'Dialog'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Close modal"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
