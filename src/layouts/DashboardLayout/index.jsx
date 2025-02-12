import { User, Calendar, Clock, MenuIcon } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import useToggleState from "@/hooks/useToggleState";
import AppSidebar from "@/components/AppSidebar";

const roleNavigationItems = {
  member: [
    { title: "Profile", path: "/member/profile", icon: User },
    { title: "Appointments", path: "/member/appointments", icon: Calendar },
    { title: "Calendar", path: "/member/calendar", icon: Clock },
  ],
  therapist: [
    { title: "Profile", path: "/member/profile", icon: User },
    { title: "Appointments", path: "/member/appointments", icon: Calendar },
    { title: "Calendar", path: "/member/calendar", icon: Clock },
  ],
};

const DashboardLayout = ({ role = "member", children }) => {
  const [isMobileMenuOpen, toggleIsMobileMenuOpen] = useToggleState(false);

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen bg-white">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform lg:relative lg:translate-x-0 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <AppSidebar
            navigationItems={roleNavigationItems[role]}
            onCloseMobileMenu={() => toggleIsMobileMenuOpen()}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Header */}
          <header className="sticky top-0 bg-white h-8 flex items-center justify-between p-2 my-2">
            <button
              onClick={toggleIsMobileMenuOpen}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle Sidebar"
              aria-expanded={isMobileMenuOpen}
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto px-6 bg-white">{children}</main>

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
            onClick={toggleIsMobileMenuOpen}
            aria-hidden="true"
          />
        )}
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
