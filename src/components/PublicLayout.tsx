import { NavLink, Outlet } from "react-router-dom";
import { Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { Toaster } from "@/components/ui/sonner";
const PublicHeader = () => (
  <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold text-green-600">
          <Leaf className="w-7 h-7" />
          <span className="font-display">ALST</span>
        </NavLink>
        <div className="flex items-center space-x-2">
          <Button asChild variant="ghost">
            <NavLink to="/login">Sign In</NavLink>
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <NavLink to="/register">Sign Up</NavLink>
          </Button>
        </div>
      </div>
    </div>
  </header>
);
const PublicFooter = () => (
  <footer className="border-t bg-background">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Agri-Loan & Subsidy Tracker ALST. All rights reserved.</p>
      <p className="mt-1">Built with ❤️ at Cloudflare</p>
    </div>
  </footer>
);
export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-background">
      <PublicHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <PublicFooter />
      <Toaster richColors closeButton />
    </div>
  );
}