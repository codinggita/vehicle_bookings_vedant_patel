import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@components/navigation/Sidebar';
import Navbar from '@components/navigation/Navbar';
import MainContent from '@components/layout/MainContent';

/**
 * DashboardLayout Component
 * Serves as the primary layout shell for authenticated dashboard pages.
 * Integrates Sidebar navigation, Top Header Navbar, and Main Content viewport.
 * 
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Page content if not using nested routes
 */
const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Sidebar Drawer Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Right Side Workstation */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Navigation Header */}
        <Navbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />

        {/* Dynamic Page Content Viewport */}
        <MainContent>
          {children || <Outlet />}
        </MainContent>
      </div>
    </div>
  );
};

export default DashboardLayout;
