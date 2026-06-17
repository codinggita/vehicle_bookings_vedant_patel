import { useState, useRef, useEffect } from 'react';

/**
 * DatasetRow Component
 * Renders a single row in the dataset table.
 * 
 * @param {Object} props
 * @param {Object} props.dataset - The dataset booking object
 * @param {function} props.onEdit - Callback when edit action is clicked
 * @param {function} props.onDelete - Callback when delete action is clicked
 */
const DatasetRow = ({ dataset, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close actions menu if clicked outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMenuOpen]);

  // Helper for status styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Success':
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Success
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Pending
          </span>
        );
      case 'Canceled by Customer':
      case 'Canceled by Driver':
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            Cancelled
          </span>
        );
      case 'Driver Not Found':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            No Driver
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 border border-slate-500/20 text-slate-400">
            {status}
          </span>
        );
    }
  };

  // Helper for payment styling
  const getPaymentBadge = (method) => {
    const text = String(method).toUpperCase();
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider bg-slate-800 border border-slate-700 text-slate-300 uppercase">
        {text}
      </span>
    );
  };

  // Helper for formatting date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  // Helper for vehicle type styling
  const formatVehicle = (vehicle) => {
    if (!vehicle) return '';
    return vehicle.charAt(0).toUpperCase() + vehicle.slice(1);
  };

  return (
    <tr className="border-b border-slate-800/50 hover:bg-slate-800/10 transition-colors duration-150 group">
      
      {/* Booking ID */}
      <td className="px-6 py-4 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
        {dataset.bookingId || 'N/A'}
      </td>

      {/* Customer Name */}
      <td className="px-6 py-4 text-sm font-semibold text-slate-200 truncate max-w-[150px]">
        {dataset.customerName || 'N/A'}
      </td>

      {/* Vehicle Type */}
      <td className="px-6 py-4 text-sm text-slate-300 font-medium">
        {formatVehicle(dataset.vehicleType)}
      </td>

      {/* Booking Status */}
      <td className="px-6 py-4">
        {getStatusBadge(dataset.bookingStatus)}
      </td>

      {/* Payment Method */}
      <td className="px-6 py-4">
        {getPaymentBadge(dataset.paymentMethod || 'cash')}
      </td>

      {/* Fare */}
      <td className="px-6 py-4 text-sm font-bold text-slate-200">
        ${Number(dataset.fare || 0).toFixed(2)}
      </td>

      {/* Distance */}
      <td className="px-6 py-4 text-sm text-slate-300 font-semibold">
        {Number(dataset.distance || 0).toFixed(1)} mi
      </td>

      {/* Rating */}
      <td className="px-6 py-4">
        {dataset.customerRating ? (
          <div className="flex items-center gap-1">
            <span className="text-amber-400 text-xs font-bold">★</span>
            <span className="text-sm font-semibold text-slate-200">{dataset.customerRating}</span>
          </div>
        ) : (
          <span className="text-xs text-slate-500 font-medium">—</span>
        )}
      </td>

      {/* Booking Date */}
      <td className="px-6 py-4 text-sm text-slate-400 font-medium whitespace-nowrap">
        {formatDate(dataset.bookingDate)}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 relative">
        <div ref={menuRef} className="inline-block text-left">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1 rounded-lg border border-transparent hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all duration-200"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            aria-label="Actions menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 bottom-full mb-1 sm:bottom-auto sm:top-full sm:mt-1 z-30 w-36 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 animate-fade-in">
              <button
                onClick={() => {
                  onEdit(dataset);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm font-semibold text-slate-300 hover:text-indigo-400 hover:bg-slate-800/50 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Details
              </button>
              
              <button
                onClick={() => {
                  onDelete(dataset);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/5 border-t border-slate-800/80 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>
      </td>

    </tr>
  );
};

export default DatasetRow;
