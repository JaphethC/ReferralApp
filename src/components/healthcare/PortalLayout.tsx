import React from 'react';
import { 
  Calendar, 
  Home, 
  Users, 
  FileText, 
  Settings,
  Bell,
  Menu,
  LogOut,
  Activity,
  Stethoscope,
  User
} from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Badge } from '../ui/badge';

export type PortalRole = 'patient' | 'physician' | 'admin';

interface NavigationItem {
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

interface PortalLayoutProps {
  role: PortalRole;
  userName: string;
  userInitials: string;
  userImage?: string;
  children: React.ReactNode;
  currentPath?: string;
  notificationCount?: number;
  onNavigate?: (href: string) => void;
  onLogout?: () => void;
  sidebarContent?: React.ReactNode;
}

const navigationByRole: Record<PortalRole, NavigationItem[]> = {
  patient: [
    { label: 'Dashboard', icon: Home, href: '/dashboard' },
    { label: 'Appointments', icon: Calendar, href: '/appointments' },
    { label: 'Medical Records', icon: FileText, href: '/records' },
    { label: 'Messages', icon: Bell, href: '/messages', badge: 3 },
    { label: 'Profile', icon: User, href: '/profile' },
  ],
  physician: [
    { label: 'Dashboard', icon: Home, href: '/dashboard' },
    { label: 'Patients', icon: Users, href: '/patients' },
    { label: 'Schedule', icon: Calendar, href: '/schedule' },
    { label: 'Clinical Notes', icon: FileText, href: '/notes' },
    { label: 'Messages', icon: Bell, href: '/messages', badge: 5 },
  ],
  admin: [
    { label: 'Dashboard', icon: Home, href: '/dashboard' },
    { label: 'Users', icon: Users, href: '/users' },
    { label: 'Appointments', icon: Calendar, href: '/appointments' },
    { label: 'Analytics', icon: Activity, href: '/analytics' },
    { label: 'Settings', icon: Settings, href: '/settings' },
  ],
};

const roleLabels: Record<PortalRole, string> = {
  patient: 'Patient Portal',
  physician: 'Physician Portal',
  admin: 'Admin Portal',
};

const roleIcons: Record<PortalRole, React.ElementType> = {
  patient: User,
  physician: Stethoscope,
  admin: Settings,
};

export function PortalLayout({ 
  role, 
  userName, 
  userInitials,
  userImage,
  children,
  currentPath = '/dashboard',
  notificationCount = 0,
  onNavigate,
  onLogout,
  sidebarContent,
}: PortalLayoutProps) {
  const navigation = navigationByRole[role];
  const RoleIcon = roleIcons[role];

  const NavItems = () => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href;
        
        return (
          <button
            key={item.href}
            onClick={() => onNavigate?.(item.href)}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full
              ${isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-secondary'
              }
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <Badge 
                variant="destructive" 
                className="ml-auto h-5 min-w-5 px-1 text-xs"
              >
                {item.badge}
              </Badge>
            )}
          </button>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card">
        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex h-full flex-col">
                <div className="flex h-16 items-center gap-2 border-b px-6">
                  <RoleIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <span className="font-semibold">{roleLabels[role]}</span>
                </div>
                <nav className="flex-1 space-y-1 p-4" aria-label="Main navigation">
                  <NavItems />
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <RoleIcon className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="hidden font-semibold sm:inline-block">
              {roleLabels[role]}
            </span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
            <span className="sr-only">Notifications ({notificationCount})</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  {userImage && <AvatarImage src={userImage} alt={userName} />}
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p>{userName}</p>
                  <p className="text-sm font-normal text-muted-foreground">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onNavigate?.('/profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate?.('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:fixed lg:inset-y-0 lg:top-16 lg:flex lg:w-64 lg:flex-col border-r bg-card">
          <nav className="flex-1 space-y-1 p-4" aria-label="Main navigation">
            <NavItems />
          </nav>
          {sidebarContent && (
            <div className="p-4 border-t">
              {sidebarContent}
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="container mx-auto p-4 lg:p-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
