import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <HelmetProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans">
        <Helmet>
          <title>VehicleSphere - Dashboard</title>
        </Helmet>
        
        <div className="max-w-md p-8 bg-slate-800 rounded-2xl shadow-xl text-center border border-slate-700">
          <h1 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            VehicleSphere Dashboard
          </h1>
          <p className="text-slate-400 mb-6">
            Frontend initialization Phase 0.1 is successfully completed. Enterprise structure, Material UI, TailwindCSS, Router, and Redux are fully configured and ready.
          </p>
          <div className="inline-block px-4 py-2 bg-slate-700 text-amber-400 rounded-lg text-sm font-semibold tracking-wide border border-slate-600">
            React + Vite + Tailwind + MUI + Redux
          </div>
        </div>

        <Toaster position="bottom-right" />
      </div>
    </HelmetProvider>
  );
}

export default App;
