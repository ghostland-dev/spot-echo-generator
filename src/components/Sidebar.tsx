
import { Home, Users, Bookmark, Clock, ChevronDown, Settings, Bell, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: "Accueil", path: "/", active: location.pathname === "/" },
    { icon: Search, label: "Recherche", path: "/search", active: location.pathname === "/search" },
    { icon: Users, label: "Amis", path: "/friends", count: 12, active: location.pathname === "/friends" },
    { icon: Bell, label: "Notifications", path: "/notifications", count: 3, active: location.pathname === "/notifications" },
    { icon: Bookmark, label: "Groupes", path: "/groups", active: location.pathname === "/groups" },
    { icon: Clock, label: "Souvenirs", active: false },
    { icon: Settings, label: "Paramètres", path: "/settings", active: location.pathname === "/settings" },
  ];

  const shortcuts = [
    { name: "Développement Web", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=40&h=40&fit=crop" },
    { name: "Photographie", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=40&h=40&fit=crop" },
    { name: "Voyages", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=40&h=40&fit=crop" },
  ];

  return (
    <aside className="hidden lg:block w-80 p-4" role="navigation" aria-label="Menu principal">
      <nav className="space-y-2">
        {/* Profil utilisateur */}
        <Link 
          to="/profile"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          aria-label="Aller à votre profil"
        >
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=36&h=36&fit=crop&crop=face" 
            alt="Votre profil" 
            className="w-9 h-9 rounded-full"
            loading="lazy"
          />
          <span className="font-medium text-foreground">Votre Profil</span>
        </Link>

        {/* Menu principal */}
        {menuItems.map((item, index) => (
          item.path ? (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                item.active ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
              aria-current={item.active ? 'page' : undefined}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count && (
                <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full" aria-label={`${item.count} éléments`}>
                  {item.count}
                </span>
              )}
            </Link>
          ) : (
            <div 
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                item.active ? 'bg-accent text-accent-foreground' : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && console.log('Action')}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count && (
                <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full" aria-label={`${item.count} éléments`}>
                  {item.count}
                </span>
              )}
            </div>
          )
        ))}

        <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors w-full text-left" aria-label="Voir plus d'options">
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium text-muted-foreground">Voir plus</span>
        </button>

        <hr className="my-4 border-border" />

        {/* Raccourcis */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3">
            <span className="text-muted-foreground font-medium">Vos raccourcis</span>
          </div>
          {shortcuts.map((shortcut, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && console.log('Navigate to', shortcut.name)}
            >
              <img 
                src={shortcut.image} 
                alt={shortcut.name}
                className="w-9 h-9 rounded-lg object-cover"
                loading="lazy"
              />
              <span className="font-medium text-foreground">{shortcut.name}</span>
            </div>
          ))}
        </div>

        {/* Lien vers À propos */}
        <hr className="my-4 border-border" />
        <Link 
          to="/about"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
        >
          <span className="font-medium">À propos de Febspot</span>
        </Link>
      </nav>
    </aside>
  );
};
