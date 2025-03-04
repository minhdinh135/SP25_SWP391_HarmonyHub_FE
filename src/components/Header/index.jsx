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

const avatarItems = [
  {
    title: "Dashboard",
    icon: <User className="size-5 shrink-0" />,
  },
  {
    title: "Logout",
    icon: <ArrowLeftSquare className="size-5 shrink-0" />,
  },
];

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClickLogin = () => navigate("/login");
  const handleClickSignup = () => navigate("/sign-up");

  const handleAvatarItemClick = (title) => {
    switch (title) {
      case "Dashboard":
        if (getRoleText(user.role) === "Admin") {
          navigate("/admin");
          break;
        }
        if (getRoleText(user.role) === "Member") {
          navigate("/member/profile");
          break;
        }
        if (getRoleText(user.role) === "Therapist") {
          navigate("/therapist/profile");
          break;
        }
        break;
      case "Logout":
        logout();
        break;
      default:
        console.log("No title found");
    }
  };

  return (
    <section className="w-full border-b-2 px-8 py-2">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2 hover:cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                <img src="https://images-platform.99static.com//MDVqrTbdUmben2nTrA2mj8DHycw=/168x11:883x726/fit-in/500x500/99designs-contests-attachments/14/14940/attachment_14940716" alt="Logo" className="w-8 h-8 rounded" />
              </div>
              <span className="text-xl text-gray-900 font-semibold">
                Harmony Hub
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                className={cn(
                  navigationMenuTriggerStyle,
                  buttonVariants({ variant: "ghost" }),
                )}
                href="/"
              >
                Home
              </a>
              <a
                className={cn(
                  navigationMenuTriggerStyle,
                  buttonVariants({ variant: "ghost" }),
                )}
                href="/about"
              >
                About Us
              </a>
              <a
                className={cn(
                  navigationMenuTriggerStyle,
                  buttonVariants({ variant: "ghost" }),
                )}
                href="/quizzes"
              >
                Quizzes
              </a>
              <a
                className={cn(
                  navigationMenuTriggerStyle,
                  buttonVariants({ variant: "ghost" }),
                )}
                href="/blogs"
              >
                Blogs
              </a>
              <a
                className={cn(
                  navigationMenuTriggerStyle,
                  buttonVariants({ variant: "ghost" }),
                )}
                href="/therapists"
              >
                Therapists
              </a>
            </div>
          </div>

          {user ? (
            <div className="flex">
              <NavigationMenu className="mx-auto relative">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="overflow-hidden rounded-md border bg-white shadow-md">
                      <ul>
                        <NavigationMenuLink>
                          {avatarItems.map((item, idx) => (
                            <li
                              key={idx}
                              onClick={() => handleAvatarItemClick(item.title)}
                            >
                              <a
                                className={cn(
                                  "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                )}
                                href="#"
                              >
                                {item.icon}
                                <div>
                                  <div className="text-sm font-semibold">
                                    {item.title}
                                  </div>
                                </div>
                              </a>
                            </li>
                          ))}
                        </NavigationMenuLink>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex flex-col justify-center">
                <span className="text-sm">
                  {getFullName(user.firstName, user.lastName)}
                </span>
                <span className="text-xs font-semibold">
                  {getRoleText(user.role)}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                className="bg-blue-600 border-2 hover:bg-blue-300"
                onClick={handleClickLogin}
              >
                Login
              </Button>
              <Button
                className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-300"
                onClick={handleClickSignup}
              >
                Sign up
              </Button>
            </div>
          )}
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 hover:cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-xl text-gray-900 font-semibold">
                Harmony Hub
              </span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <div
                      className="flex items-center gap-2 hover:cursor-pointer"
                      onClick={() => navigate("/")}
                    >
                      <span className="text-xl text-gray-900 font-semibold">
                        Harmony Hub
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mb-8 mt-8 flex flex-col gap-4">
                  <a href="#" className="font-semibold">
                    Home
                  </a>
                  <a href="/about" className="font-semibold">
                    About Us
                  </a>
                  <a href="/quizzes" className="font-semibold">
                    Quizzes
                  </a>
                  <a href="/blogs" className="font-semibold">
                    Blogs
                  </a>
                  <a href="/therapists" className="font-semibold">
                    Therapists
                  </a>
                </div>
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 justify-start">
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground",
                      )}
                      href="#"
                    >
                      Terms & Services
                    </a>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground",
                      )}
                      href="#"
                    >
                      Contact
                    </a>
                  </div>
                  <div className="mt-2 flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="bg-blue-600 border-2 hover:bg-blue-300"
                    >
                      <a className="text-white" href="/login">
                        Login
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white border-2 border-blue-600"
                    >
                      <a className="text-blue-600" href="/sign-up">
                        Sign up
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
