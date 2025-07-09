import React from 'react';
import { Header } from './Header';
import { ChatWidget } from '../chat/ChatWidget';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="px-6 py-8 max-w-7xl mx-auto">
        {children}
      </main>
      <ChatWidget />
    </div>
  );
};