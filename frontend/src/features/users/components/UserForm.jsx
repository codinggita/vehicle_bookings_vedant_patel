/**
 * UserForm Component
 * Shared Form layout for both Create User and Edit User modals.
 * 
 * @param {Object} props
 * @param {Object} props.formik - Formik controller instance
 * @param {boolean} [props.isEditMode=false] - If true, hides the password field
 * @param {function} props.onCancel - Callback to close the modal
 */
const UserForm = ({ formik, isEditMode = false, onCancel }) => {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      
      {/* 1. Full Name Field */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          className={`w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
            formik.touched.name && formik.errors.name ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
          }`}
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.name}</p>
        )}
      </div>

      {/* 2. Email Address Field */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="johndoe@example.com"
          className={`w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
            formik.touched.email && formik.errors.email ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
          }`}
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.email}</p>
        )}
      </div>

      {/* 3. Password Field (Only displayed in creation mode) */}
      {!isEditMode && (
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className={`w-full px-4 py-2.5 text-sm rounded-xl bg-slate-950 border text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 transition-all duration-200 ${
              formik.touched.password && formik.errors.password ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
            }`}
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.password}</p>
          )}
        </div>
      )}

      {/* 4. Role & Status Side-by-Side */}
      <div className="grid grid-cols-2 gap-4">
        {/* Role Select */}
        <div className="space-y-1.5">
          <label htmlFor="role" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Role
          </label>
          <div className="relative">
            <select
              id="role"
              name="role"
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950 border text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 appearance-none cursor-pointer transition-all duration-200 ${
                formik.touched.role && formik.errors.role ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
              }`}
              {...formik.getFieldProps('role')}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
          {formik.touched.role && formik.errors.role && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.role}</p>
          )}
        </div>

        {/* Status Select */}
        <div className="space-y-1.5">
          <label htmlFor="status" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Status
          </label>
          <div className="relative">
            <select
              id="status"
              name="status"
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-950 border text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/60 appearance-none cursor-pointer transition-all duration-200 ${
                formik.touched.status && formik.errors.status ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
              }`}
              {...formik.getFieldProps('status')}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
          {formik.touched.status && formik.errors.status && (
            <p className="text-red-400 text-xs font-medium pl-1">{formik.errors.status}</p>
          )}
        </div>
      </div>

      {/* 5. Cancel / Submit Actions */}
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
            isEditMode ? 'Save Changes' : 'Create User'
          )}
        </button>
      </div>

    </form>
  );
};

export default UserForm;
