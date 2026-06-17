import { memo } from 'react';

/**
 * DatasetForm Component
 * Shared Form layout for both Create Dataset and Edit Dataset modals.
 * 
 * @param {Object} props
 * @param {Object} props.formik - Formik controller instance
 * @param {boolean} [props.isEditMode=false] - If true, lock/disable certain fields like bookingId if needed
 * @param {function} props.onCancel - Callback to close the modal
 */
const DatasetForm = memo(({ formik, isEditMode = false, onCancel }) => {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      
      {/* Grid 1: Identifiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Booking ID */}
        <div className="space-y-1">
          <label htmlFor="bookingId" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Booking ID
          </label>
          <input
            id="bookingId"
            name="bookingId"
            type="text"
            placeholder="BK-2026-0001"
            disabled={isEditMode}
            className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 disabled:opacity-50 ${
              formik.touched.bookingId && formik.errors.bookingId ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('bookingId')}
          />
          {formik.touched.bookingId && formik.errors.bookingId && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.bookingId}</p>
          )}
        </div>

        {/* Customer ID */}
        <div className="space-y-1">
          <label htmlFor="customerId" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Customer ID
          </label>
          <input
            id="customerId"
            name="customerId"
            type="text"
            placeholder="CUST-1001"
            className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
              formik.touched.customerId && formik.errors.customerId ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('customerId')}
          />
          {formik.touched.customerId && formik.errors.customerId && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.customerId}</p>
          )}
        </div>
      </div>

      {/* Grid 2: Customer Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Name */}
        <div className="space-y-1">
          <label htmlFor="customerName" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Customer Name
          </label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            placeholder="John Doe"
            className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
              formik.touched.customerName && formik.errors.customerName ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('customerName')}
          />
          {formik.touched.customerName && formik.errors.customerName && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.customerName}</p>
          )}
        </div>

        {/* Customer Phone */}
        <div className="space-y-1">
          <label htmlFor="customerPhone" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Customer Phone
          </label>
          <input
            id="customerPhone"
            name="customerPhone"
            type="text"
            placeholder="+15550100"
            className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
              formik.touched.customerPhone && formik.errors.customerPhone ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('customerPhone')}
          />
          {formik.touched.customerPhone && formik.errors.customerPhone && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.customerPhone}</p>
          )}
        </div>
      </div>

      {/* Grid 3: Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pickup Location */}
        <div className="space-y-1">
          <label htmlFor="pickupLocation" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Pickup Location
          </label>
          <input
            id="pickupLocation"
            name="pickupLocation"
            type="text"
            placeholder="Times Square, NY"
            className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
              formik.touched.pickupLocation && formik.errors.pickupLocation ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('pickupLocation')}
          />
          {formik.touched.pickupLocation && formik.errors.pickupLocation && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.pickupLocation}</p>
          )}
        </div>

        {/* Drop Location */}
        <div className="space-y-1">
          <label htmlFor="dropLocation" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Drop Location
          </label>
          <input
            id="dropLocation"
            name="dropLocation"
            type="text"
            placeholder="JFK Airport, NY"
            className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
              formik.touched.dropLocation && formik.errors.dropLocation ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('dropLocation')}
          />
          {formik.touched.dropLocation && formik.errors.dropLocation && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.dropLocation}</p>
          )}
        </div>
      </div>

      {/* Grid 4: Specific Ride Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Vehicle Type */}
        <div className="space-y-1">
          <label htmlFor="vehicleType" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Vehicle Type
          </label>
          <div className="relative">
            <select
              id="vehicleType"
              name="vehicleType"
              className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none cursor-pointer transition-all duration-200 ${
                formik.touched.vehicleType && formik.errors.vehicleType ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
              }`}
              {...formik.getFieldProps('vehicleType')}
            >
              <option value="">Select Type</option>
              <option value="Mini">Mini</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="hatchback">Hatchback</option>
              <option value="prime">Prime</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
          {formik.touched.vehicleType && formik.errors.vehicleType && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.vehicleType}</p>
          )}
        </div>

        {/* Distance */}
        <div className="space-y-1">
          <label htmlFor="distance" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Distance (miles)
          </label>
          <input
            id="distance"
            name="distance"
            type="number"
            step="0.1"
            placeholder="10.5"
            className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
              formik.touched.distance && formik.errors.distance ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('distance')}
          />
          {formik.touched.distance && formik.errors.distance && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.distance}</p>
          )}
        </div>

        {/* Fare */}
        <div className="space-y-1">
          <label htmlFor="fare" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Fare ($)
          </label>
          <input
            id="fare"
            name="fare"
            type="number"
            step="0.01"
            placeholder="45.50"
            className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
              formik.touched.fare && formik.errors.fare ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('fare')}
          />
          {formik.touched.fare && formik.errors.fare && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.fare}</p>
          )}
        </div>
      </div>

      {/* Grid 5: Booking Details & Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Booking Status */}
        <div className="space-y-1">
          <label htmlFor="bookingStatus" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Booking Status
          </label>
          <div className="relative">
            <select
              id="bookingStatus"
              name="bookingStatus"
              className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none cursor-pointer transition-all duration-200 ${
                formik.touched.bookingStatus && formik.errors.bookingStatus ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
              }`}
              {...formik.getFieldProps('bookingStatus')}
            >
              <option value="">Select Status</option>
              <option value="Success">Success</option>
              <option value="Canceled by Customer">Canceled by Customer</option>
              <option value="Canceled by Driver">Canceled by Driver</option>
              <option value="Driver Not Found">Driver Not Found</option>
              <option value="pending">Pending</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
          {formik.touched.bookingStatus && formik.errors.bookingStatus && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.bookingStatus}</p>
          )}
        </div>

        {/* Payment Method */}
        <div className="space-y-1">
          <label htmlFor="paymentMethod" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Payment Method
          </label>
          <div className="relative">
            <select
              id="paymentMethod"
              name="paymentMethod"
              className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none cursor-pointer transition-all duration-200 ${
                formik.touched.paymentMethod && formik.errors.paymentMethod ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
              }`}
              {...formik.getFieldProps('paymentMethod')}
            >
              <option value="">Select Method</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
          {formik.touched.paymentMethod && formik.errors.paymentMethod && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.paymentMethod}</p>
          )}
        </div>

        {/* Payment Status */}
        <div className="space-y-1">
          <label htmlFor="paymentStatus" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Payment Status
          </label>
          <div className="relative">
            <select
              id="paymentStatus"
              name="paymentStatus"
              className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none cursor-pointer transition-all duration-200 ${
                formik.touched.paymentStatus && formik.errors.paymentStatus ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
              }`}
              {...formik.getFieldProps('paymentStatus')}
            >
              <option value="">Select Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
          {formik.touched.paymentStatus && formik.errors.paymentStatus && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.paymentStatus}</p>
          )}
        </div>
      </div>

      {/* Grid 6: Ratings & Date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Driver Rating */}
        <div className="space-y-1">
          <label htmlFor="driverRating" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Driver Rating (1-5)
          </label>
          <input
            id="driverRating"
            name="driverRating"
            type="number"
            min="1"
            max="5"
            placeholder="5"
            className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
              formik.touched.driverRating && formik.errors.driverRating ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('driverRating')}
          />
          {formik.touched.driverRating && formik.errors.driverRating && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.driverRating}</p>
          )}
        </div>

        {/* Customer Rating */}
        <div className="space-y-1">
          <label htmlFor="customerRating" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Customer Rating (1-5)
          </label>
          <input
            id="customerRating"
            name="customerRating"
            type="number"
            min="1"
            max="5"
            placeholder="5"
            className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
              formik.touched.customerRating && formik.errors.customerRating ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('customerRating')}
          />
          {formik.touched.customerRating && formik.errors.customerRating && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.customerRating}</p>
          )}
        </div>

        {/* Booking Date */}
        <div className="space-y-1">
          <label htmlFor="bookingDate" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Booking Date
          </label>
          <input
            id="bookingDate"
            name="bookingDate"
            type="datetime-local"
            className={`w-full px-3 py-2 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
              formik.touched.bookingDate && formik.errors.bookingDate ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('bookingDate')}
          />
          {formik.touched.bookingDate && formik.errors.bookingDate && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.bookingDate}</p>
          )}
        </div>
      </div>

      {/* Cancel / Submit Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/80">
        <button
          type="button"
          onClick={onCancel}
          disabled={formik.isSubmitting}
          className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 transition-all duration-200 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/15 disabled:opacity-50 flex items-center justify-center gap-1.5"
        >
          {formik.isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            isEditMode ? 'Save Changes' : 'Create Booking'
          )}
        </button>
      </div>

    </form>
  );
});

export default DatasetForm;
