import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';

/**
 * Layout wrapper for authenticated dashboard routes.
 * Integrates Sidebar, Navbar, and scrollable container.
 */
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden relative">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Left Sidebar */}
      <div className="hidden md:block h-full z-10">
        <Sidebar />
      </div>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden z-10 relative">
        {/* Navbar */}
        <Navbar />

        {/* Dynamic Content Panel */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-950/40 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
