import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import TutorDashboard from '@/components/dashboard/TutorDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import ClientManager from '@/components/clients/ClientManager';
import QuestionBank from '@/components/questions/QuestionBank';

interface User {
  email: string;
  role: 'student' | 'tutor' | 'admin';
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentClient, setCurrentClient] = useState<string>('Demo College');
  const [currentPath, setCurrentPath] = useState('/dashboard');

  const handleLogin = (email: string, password: string, role: 'student' | 'tutor' | 'admin') => {
    // Placeholder login logic - you'll replace with Firebase auth
    setUser({ email, role });
    setCurrentPath(`/${role}/dashboard`);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPath('/');
  };

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
  };

  const handleClientSwitch = () => {
    // Placeholder for client switching logic
    console.log('Switch client functionality');
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderContent = () => {
    // Dashboard routes
    if (currentPath === '/admin/dashboard') return <AdminDashboard />;
    if (currentPath === '/tutor/dashboard') return <TutorDashboard />;
    if (currentPath === '/student/dashboard') return <StudentDashboard />;
    
    // Admin routes
    if (currentPath === '/admin/clients') return <ClientManager />;
    if (currentPath === '/admin/questions') return <QuestionBank />;
    
    // Tutor routes
    if (currentPath === '/tutor/questions') return <QuestionBank />;
    
    // Placeholder for other routes
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Page: {currentPath}</h2>
          <p className="text-muted-foreground">This page is under construction.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Use the sidebar to navigate to available pages.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user}
        currentClient={currentClient}
        notificationCount={3}
        onClientSwitch={handleClientSwitch}
        onLogout={handleLogout}
      />
      <div className="flex">
        <Sidebar 
          userRole={user.role}
          currentClient={currentClient}
          onNavigate={handleNavigation}
          currentPath={currentPath}
        />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
