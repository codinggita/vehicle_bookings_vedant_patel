import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import notificationService from '@components/notifications/notificationService';
import { login } from '@services/authService';
import { setCredentials } from '@features/auth/authSlice';
import { ROUTES } from '../routes/routeConfig';

// Validation Schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await login(values.email, values.password);
        
        if (response?.success && response?.token) {
          // Dispatch action to update Redux store and write to localStorage
          dispatch(setCredentials({
            user: response.user,
            token: response.token,
          }));

          notificationService.showSuccess(`Welcome back, ${response.user.name || 'User'}!`);

          // Role-based redirection logic
          if (response.user.role === 'admin') {
            navigate(ROUTES.ADMIN);
          } else {
            navigate(ROUTES.USER);
          }
        } else {
          notificationService.showError(response?.message || 'Authentication failed. Please try again.');
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Connection to server failed. Please try again.';
        notificationService.showError(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 relative overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 shadow-2xl z-10 space-y-8 transition-all duration-300 hover:border-slate-700/80">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-2 border border-indigo-500/20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            VehicleSphere
          </h1>
          <p className="text-slate-400 text-sm">
            Sign in to access your bookings dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                  formik.touched.email && formik.errors.email ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
                }`}
                {...formik.getFieldProps('email')}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-xs mt-1 font-medium">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full pl-4 pr-12 py-3 rounded-xl bg-slate-950/80 border text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${
                  formik.touched.password && formik.errors.password ? 'border-red-500/50' : 'border-slate-800 hover:border-slate-700'
                }`}
                {...formik.getFieldProps('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors duration-150"
              >
                {showPassword ? (
                  // Eye Closed Icon
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  // Eye Open Icon
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-xs mt-1 font-medium">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all duration-200 transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {formik.isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
