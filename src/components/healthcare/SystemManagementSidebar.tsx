import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Settings, 
  Users, 
  Stethoscope,
  Building2,
  FileText,
  Shield,
  Database,
  Bell,
  ChevronRight
} from 'lucide-react';
import { Separator } from '../ui/separator';

interface ManagementLink {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  badge?: string;
}

interface SystemManagementSidebarProps {
  onNavigate?: (section: string) => void;
}

export function SystemManagementSidebar({ onNavigate }: SystemManagementSidebarProps) {
  const userManagementLinks: ManagementLink[] = [
    {
      label: 'Manage Providers',
      icon: Stethoscope,
      onClick: () => onNavigate?.('providers'),
      badge: '48',
    },
    {
      label: 'Manage Patients',
      icon: Users,
      onClick: () => onNavigate?.('patients'),
      badge: '1,247',
    },
    {
      label: 'Staff & Admins',
      icon: Shield,
      onClick: () => onNavigate?.('staff'),
    },
  ];

  const systemLinks: ManagementLink[] = [
    {
      label: 'Service Lines',
      icon: Building2,
      onClick: () => onNavigate?.('services'),
    },
    {
      label: 'System Settings',
      icon: Settings,
      onClick: () => onNavigate?.('settings'),
    },
    {
      label: 'Reports & Analytics',
      icon: FileText,
      onClick: () => onNavigate?.('reports'),
    },
    {
      label: 'Data Management',
      icon: Database,
      onClick: () => onNavigate?.('data'),
    },
    {
      label: 'Notifications',
      icon: Bell,
      onClick: () => onNavigate?.('notifications'),
      badge: '3',
    },
  ];

  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Settings className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="truncate">Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-3">
        {/* User Management Section */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-medium text-muted-foreground px-1.5">Users</h4>
          <div className="space-y-0.5">
            {userManagementLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button
                  key={link.label}
                  variant="ghost"
                  className="w-full justify-between h-auto py-2 px-2 text-left"
                  onClick={link.onClick}
                >
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs truncate">{link.label}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {link.badge && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* System Settings Section */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-medium text-muted-foreground px-1.5">System</h4>
          <div className="space-y-0.5">
            {systemLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button
                  key={link.label}
                  variant="ghost"
                  className="w-full justify-between h-auto py-2 px-2 text-left"
                  onClick={link.onClick}
                >
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs truncate">{link.label}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {link.badge && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-destructive/10 text-destructive">
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
