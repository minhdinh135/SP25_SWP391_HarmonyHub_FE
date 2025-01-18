import { memo } from "react";
import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavLink } from "react-router-dom";

const navigationItems = [
  { title: "Overview", path: "/admin", icon: Home },
  { title: "Accounts", path: "/admin/accounts", icon: User },
  { title: "Inbox", path: "/admin/inbox", icon: Inbox, badge: 3 },
  { title: "Calendar", path: "/admin/calendar", icon: Calendar },
  { title: "Search", path: "/admin/search", icon: Search },
  { title: "Settings", path: "/admin/settings", icon: Settings },
];

const AppSidebar = ({ onCloseMobileMenu }) => {
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <Sidebar className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 p-4 border-b">
        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-bold">H</span>
        </div>
        <h1 className="text-xl font-bold">Harmony Hub</h1>
      </div>

      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      onClick={onCloseMobileMenu}
                      className={({ isActive }) => `
                        flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-200
                        ${
                          isActive
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100 active:bg-gray-200"
                        }
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          className="flex items-center gap-2 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </Sidebar>
  );
};

export default memo(AppSidebar);
