import React from 'react';
import { Outlet } from 'react-router-dom';
import { ListTodo } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center space-x-3">
            <ListTodo size={24} className="text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Task Management Dashboard
            </h1>
          </div>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
