import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { getRoleText } from "@/utils/enumUtils";
import { ArrowLeftSquare, Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getFullName } from "@/utils/nameFormat";
import appLogo from "@/assets/harmony-logo.png";

const navLinks = {
  "Home": "/",
  "About Us": "/about",
  "Quizzes": "/quizzes",
  "Blogs": "/blogs",
  "Therapists": "/therapists",
};

const avatarItems = [
  { title: "Dashboard", icon: <User className="size-5 shrink-0" /> },
  { title: "Logout", icon: <ArrowLeftSquare className="size-5 shrink-0" /> },
];

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAvatarItemClick = (title) => {
    switch (title) {
      case "Dashboard":
        const role = getRoleText(user.role);
        navigate(
          role === "Admin" ? "/admin" : role === "Member" ? "/member/profile" : "/therapist/profile"
        );
        break;
      case "Logout":
        logout();
        break;
    }
  };

  return (
    <header className="w-full border-b-2 px-6 py-3 bg-white shadow-sm">
      <div className="container flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-12 h-12 rounded bg-blue-100 flex items-center justify-center">
            <img
              src="https://images-platform.99static.com//MDVqrTbdUmben2nTrA2mj8DHycw=/168x11:883x726/fit-in/500x500/99designs-contests-attachments/14/14940/attachment_14940716"
              alt="Logo"
              className="w-13 h-13 rounded object-cover"
            />
          </div>
          <span className="text-2xl font-bold text-gray-900">Harmony Hub</span>
        </div>

        <nav className="hidden lg:flex space-x-6">
          {Object.entries(navLinks).map(([label, path]) => (
            <a
              key={label}
              href={path}
              className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }))}
            >
              {label}
            </a>
          ))}
        </nav>

        {user ? (
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="rounded-md border bg-white shadow-md">
                    <ul>
                      {avatarItems.map((item, idx) => (
                        <li key={idx} onClick={() => handleAvatarItemClick(item.title)}>
                          <a className="flex items-center gap-4 p-3 hover:bg-gray-100 cursor-pointer">
                            {item.icon}
                            <span className="text-sm font-semibold">{item.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex flex-col">
              <span className="text-sm font-medium">{getFullName(user.firstName, user.lastName)}</span>
              <span className="text-xs text-gray-500">{getRoleText(user.role)}</span>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex gap-3">
            <Button className="bg-[#2E5077] text-white hover:bg-[#4DA1A9]" onClick={() => navigate("/login")}>Login</Button>
            <Button className="bg-[#79D7BE] border border-white text-[#2E5077] hover:bg-[#2E5077] hover:text-white" onClick={() => navigate("/sign-up")}>Sign Up</Button>
          </div>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Harmony Hub</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 space-y-4">
              {Object.entries(navLinks).map(([label, path]) => (
                <a key={label} href={path} className="block text-lg font-medium text-gray-900">{label}</a>
              ))}
            </nav>
            {!user && (
              <div className="mt-6 space-y-3">
                <Button className="w-full bg-[#80CBC4] text-white hover:bg-[#4DA1A9] focus:ring-2 focus:ring-blue-300" onClick={() => navigate("/login")}>Login</Button>
                <Button className="w-full border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white focus:ring-2 focus:ring-blue-300" onClick={() => navigate("/sign-up")}>Sign Up</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
