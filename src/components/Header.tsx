
import { Search, MessageCircle, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et recherche */}
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Febspot</h1>
            </div>
            <div className="max-w-md flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Rechercher sur Febspot..." 
                  className="pl-10 bg-gray-100 border-none rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Navigation et profil */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <MessageCircle className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors md:hidden">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">V</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
