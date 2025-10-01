import { useState } from 'react';
import { Menu, Leaf, LogOut, LayoutDashboard, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { cn } from '@/lib/utils';
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };
  const NavLinkItem = ({ to, icon: Icon, children, end = false }: { to: string; icon: React.ElementType; children: React.ReactNode; end?: boolean }) => (
    <NavLink
      to={to}
      end={end}
      onClick={() => setIsOpen(false)}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          isActive && "bg-muted text-primary"
        )
      }
    >
      <Icon className="h-4 w-4" />
      {children}
    </NavLink>
  );
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center space-x-2 text-xl font-bold text-green-600">
              <Leaf className="w-7 h-7" />
              <span className="font-display">ALST</span>
            </NavLink>
          </SheetTitle>
        </SheetHeader>
        <nav className="grid gap-2 text-lg font-medium flex-1 mt-8">
          <NavLinkItem to="/dashboard" icon={LayoutDashboard} end={true}>Dashboard</NavLinkItem>
          <NavLinkItem to="/dashboard/schemes" icon={List}>Schemes</NavLinkItem>
        </nav>
        <div className="mt-auto">
          <div className="border-t p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">{user?.email.split('@')[0]}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}