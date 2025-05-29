
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Search as SearchIcon, Filter, Users, Hash, MapPin } from "lucide-react";

interface SearchResult {
  id: string;
  type: 'user' | 'post' | 'group' | 'page';
  title: string;
  subtitle?: string;
  image: string;
  description?: string;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const mockResults: SearchResult[] = [
    {
      id: "1",
      type: 'user',
      title: "Sophie Martin",
      subtitle: "Photographe professionnelle",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "2",
      type: 'group',
      title: "Développeurs JavaScript",
      subtitle: "15,420 membres",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150&h=150&fit=crop",
      description: "Communauté de développeurs passionnés par JavaScript"
    },
    {
      id: "3",
      type: 'post',
      title: "Coucher de soleil magnifique",
      subtitle: "par Thomas Leroy",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=150&h=150&fit=crop",
      description: "Une photo prise lors de mon dernier voyage en Toscane..."
    }
  ];

  const filters = [
    { id: 'all', label: 'Tout', icon: SearchIcon },
    { id: 'users', label: 'Personnes', icon: Users },
    { id: 'groups', label: 'Groupes', icon: Hash },
    { id: 'pages', label: 'Pages', icon: MapPin }
  ];

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'group':
        return <Hash className="h-4 w-4 text-green-600" />;
      case 'post':
        return <SearchIcon className="h-4 w-4 text-purple-600" />;
      default:
        return <MapPin className="h-4 w-4 text-orange-600" />;
    }
  };

  const filteredResults = mockResults.filter(result => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'users') return result.type === 'user';
    if (activeFilter === 'groups') return result.type === 'group';
    if (activeFilter === 'pages') return result.type === 'page';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Recherche</h1>
            
            {/* Barre de recherche principale */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="relative mb-4">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="text"
                  placeholder="Rechercher des personnes, groupes, publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              
              {/* Filtres */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 mr-3">Filtrer par:</span>
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeFilter === filter.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <filter.icon className="h-4 w-4" />
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Résultats de recherche */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Résultats ({filteredResults.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {filteredResults.length > 0 ? (
                  filteredResults.map((result) => (
                    <div key={result.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={result.image}
                          alt={result.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {getResultIcon(result.type)}
                            <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600">
                              {result.title}
                            </h3>
                          </div>
                          {result.subtitle && (
                            <p className="text-sm text-gray-600 mb-2">{result.subtitle}</p>
                          )}
                          {result.description && (
                            <p className="text-sm text-gray-700">{result.description}</p>
                          )}
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          {result.type === 'user' ? 'Voir le profil' : 
                           result.type === 'group' ? 'Rejoindre' : 'Voir'}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
                    <p className="text-gray-600">
                      Essayez avec des mots-clés différents ou modifiez vos filtres.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Search;
