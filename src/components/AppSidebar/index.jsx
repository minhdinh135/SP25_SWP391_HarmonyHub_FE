import { memo } from "react";
import { LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const AppSidebar = ({ navigationItems, onCloseMobileMenu }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log("Logout clicked");
    logout();
    navigate("/");
  };

  return (
    <Sidebar className="flex flex-col h-full">
      <SidebarContent className="flex-1 bg-blue-200 text-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-black">
            Dashboard Menu
          </SidebarGroupLabel>
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
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-blue-200">
        <button
          className="flex items-center gap-2 w-full px-3 py-2 text-red-600 hover:bg-red-400 rounded-md transition-colors duration-200"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default memo(AppSidebar);
