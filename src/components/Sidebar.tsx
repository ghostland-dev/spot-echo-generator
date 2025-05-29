
import { Home, Users, Bookmark, Clock, ChevronDown } from "lucide-react";

export const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "Accueil", active: true },
    { icon: Users, label: "Amis", count: 12 },
    { icon: Bookmark, label: "Enregistrements" },
    { icon: Clock, label: "Souvenirs" },
  ];

  const shortcuts = [
    { name: "Développement Web", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=40&h=40&fit=crop" },
    { name: "Photographie", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=40&h=40&fit=crop" },
    { name: "Voyages", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=40&h=40&fit=crop" },
  ];

  return (
    <aside className="hidden lg:block w-80 p-4">
      <div className="space-y-2">
        {/* Profil utilisateur */}
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=36&h=36&fit=crop&crop=face" 
            alt="Votre profil" 
            className="w-9 h-9 rounded-full"
          />
          <span className="font-medium text-gray-900">Votre Profil</span>
        </div>

        {/* Menu principal */}
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              item.active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-200 text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            {item.count && (
              <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full">
                {item.count}
              </span>
            )}
          </div>
        ))}

        <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors w-full text-left">
          <ChevronDown className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-700">Voir plus</span>
        </button>

        <hr className="my-4" />

        {/* Raccourcis */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3">
            <span className="text-gray-600 font-medium">Vos raccourcis</span>
          </div>
          {shortcuts.map((shortcut, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <img 
                src={shortcut.image} 
                alt={shortcut.name}
                className="w-9 h-9 rounded-lg object-cover"
              />
              <span className="font-medium text-gray-900">{shortcut.name}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
