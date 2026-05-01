import React from 'react';
import { useAuth } from '../features/auth/hooks/useAuth';
import { LogOut, ShoppingBag, User as UserIcon } from 'lucide-react';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-black" />
              <span className="font-bold text-xl tracking-tight text-gray-900">SNITCH</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                <UserIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 capitalize">{user?.role}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Welcome back, {user?.fullName?.split(' ')[0] || 'User'}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            You are successfully logged into the SNITCH platform as a <span className="font-semibold text-gray-900 capitalize">{user?.role}</span>.
            Explore the latest trends and manage your account seamlessly.
          </p>
        </div>

        {/* Placeholder Content Area */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-64 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center">
              <span className="text-gray-400 font-medium">Dashboard Widget {item}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
