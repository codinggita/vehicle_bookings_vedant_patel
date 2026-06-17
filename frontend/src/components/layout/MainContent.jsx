/**
 * MainContent Component
 * Layout wrapper container for page content.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child page content
 */
const MainContent = ({ children }) => {
  return (
    <main className="flex-1 min-w-0 overflow-y-auto bg-slate-950 text-slate-100 relative focus:outline-none">
      {/* Soft atmospheric background glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="transition-all duration-300 ease-in-out">
          {children}
        </div>
      </div>
    </main>
  );
};

export default MainContent;
