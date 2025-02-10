import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const subMenuItemsOne = [
  { title: "Blog", description: "The latest industry news, updates, and info", icon: <Book className="size-5 shrink-0" /> },
  { title: "Company", description: "Our mission is to innovate and empower the world", icon: <Trees className="size-5 shrink-0" /> },
  { title: "Careers", description: "Browse job listing and discover our workspace", icon: <Sunset className="size-5 shrink-0" /> },
  { title: "Support", description: "Get in touch with our support team or visit our community forums", icon: <Zap className="size-5 shrink-0" /> },
];

const subMenuItemsTwo = [
  { title: "Help Center", description: "Get all the answers you need right here", icon: <Zap className="size-5 shrink-0" /> },
  { title: "Contact Us", description: "We are here to help you with any questions you have", icon: <Sunset className="size-5 shrink-0" /> },
  { title: "Status", description: "Check the current status of our services and APIs", icon: <Trees className="size-5 shrink-0" /> },
  { title: "Terms of Service", description: "Our terms and conditions for using our services", icon: <Book className="size-5 shrink-0" /> },
];

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClickLogin = () => navigate('/login');
  const handleClickSignup = () => navigate('/sign-up');

  return (
    <section className="w-full border-b-2 px-4 py-4">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">H</span>
              </div>
              <span className="text-xl text-gray-900 font-semibold">Harmony Hub</span>
            </div>
            <div className="flex items-center space-x-4">
              <a className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }))} href="/">Home</a>
              <a className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }))} href="/about">About Us</a>
              <a className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }))} href="/quizzes">Quizzes</a>
              <a className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }))} href="/blogs">Blogs</a>
              <a className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }))} href="/therapists">Therapists</a>
              <a className={cn(navigationMenuTriggerStyle, buttonVariants({ variant: "ghost" }))} href="/calendar">Calendar</a>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClickLogin}>Login</Button>
            <Button onClick={handleClickSignup}>Sign up</Button>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Header;
