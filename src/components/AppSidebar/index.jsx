import { memo } from "react";
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

const AppSidebar = ({ navigationItems, onCloseMobileMenu }) => {
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
                      className="
                        flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-200 hover:bg-green-600 active:bg-yellow-500"
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
    </Sidebar>
  );
};

export default memo(AppSidebar);
