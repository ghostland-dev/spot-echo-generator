
import { Search, MessageCircle, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";

export const Header = () => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et recherche */}
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Febspot
              </Link>
            </div>
            <div className="max-w-md flex-1">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Rechercher sur Febspot..." 
                  className="pl-10 bg-gray-100 border-none rounded-full"
                />
              </form>
            </div>
          </div>

          {/* Navigation et profil */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/notifications"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
            >
              <MessageCircle className="h-5 w-5 text-gray-600" />
            </Link>
            <Link 
              to="/notifications"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors md:hidden">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <Link 
              to="/profile"
              className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <span className="text-white text-sm font-medium">V</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
