import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BellIcon, MenuIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen bg-gray-50">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform lg:relative lg:translate-x-0 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <AppSidebar onCloseMobileMenu={() => setIsMobileMenuOpen(false)} />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white border-b shadow-sm h-16 flex items-center justify-between px-4">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle Sidebar"
              aria-expanded={isMobileMenuOpen}
            >
              <MenuIcon className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <button
                className="p-2 rounded-full hover:bg-gray-100 relative"
                aria-label="Notifications"
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="bg-white border-t py-4 px-6 text-center text-sm text-gray-600">
            <p>
              © {new Date().getFullYear()} Harmony Hub. All rights reserved.
            </p>
          </footer>
        </div>

        {/* Mobile menu backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
