import React from 'react';
import { 
  Users, 
  BookOpen, 
  FileText, 
  ClipboardList,
  Target,
  Bell,
  Settings,
  BarChart3,
  GraduationCap,
  Building2,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userRole: 'student' | 'tutor' | 'admin';
  currentClient?: string;
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  userRole, 
  currentClient, 
  onNavigate, 
  currentPath 
}) => {
  const navigationItems = {
    admin: [
      { label: 'Dashboard', icon: BarChart3, path: '/admin/dashboard' },
      { label: 'Clients', icon: Building2, path: '/admin/clients' },
      { label: 'Users', icon: Users, path: '/admin/users' },
      { label: 'Question Bank', icon: BookOpen, path: '/admin/questions' },
      { label: 'Settings', icon: Settings, path: '/admin/settings' },
    ],
    tutor: [
      { label: 'Dashboard', icon: BarChart3, path: '/tutor/dashboard' },
      { label: 'Batches', icon: GraduationCap, path: '/tutor/batches' },
      { label: 'Assessments', icon: FileText, path: '/tutor/assessments' },
      { label: 'Assignments', icon: ClipboardList, path: '/tutor/assignments' },
      { label: 'Practices', icon: Target, path: '/tutor/practices' },
      { label: 'Submissions', icon: UserCheck, path: '/tutor/submissions' },
      { label: 'Notifications', icon: Bell, path: '/tutor/notifications' },
    ],
    student: [
      { label: 'Dashboard', icon: BarChart3, path: '/student/dashboard' },
      { label: 'Assessments', icon: FileText, path: '/student/assessments' },
      { label: 'Assignments', icon: ClipboardList, path: '/student/assignments' },
      { label: 'Practices', icon: Target, path: '/student/practices' },
      { label: 'Progress', icon: UserCheck, path: '/student/progress' },
      { label: 'Notifications', icon: Bell, path: '/student/notifications' },
    ],
  };

  const items = navigationItems[userRole] || [];

  return (
    <div className="w-64 h-screen bg-gradient-card border-r border-border p-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">EduPlatform</h2>
            <p className="text-sm text-muted-foreground capitalize">{userRole}</p>
          </div>
        </div>
        
        {currentClient && (
          <div className="bg-primary/10 rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground">Current Client</p>
            <p className="font-medium text-sm truncate">{currentClient}</p>
          </div>
        )}
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Button
              key={item.path}
              variant={isActive ? userRole : 'ghost'}
              className={cn(
                "w-full justify-start",
                isActive && "shadow-card"
              )}
              onClick={() => onNavigate(item.path)}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Need help?</p>
          <Button variant="link" className="text-xs p-0 h-auto">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;