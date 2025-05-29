
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Search, Users, Lock, Globe, Plus } from "lucide-react";

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  image: string;
  privacy: 'public' | 'private';
  joined: boolean;
}

const Groups = () => {
  const [groups] = useState<Group[]>([
    {
      id: "1",
      name: "Développeurs JavaScript",
      description: "Communauté de développeurs passionnés par JavaScript et ses frameworks",
      members: 15420,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
      privacy: 'public',
      joined: true
    },
    {
      id: "2",
      name: "Photographes Amateurs",
      description: "Partagez vos plus belles photos et apprenez de nouveaux techniques",
      members: 8234,
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=200&fit=crop",
      privacy: 'public',
      joined: false
    },
    {
      id: "3",
      name: "Voyageurs du Monde",
      description: "Découvrez de nouvelles destinations et partagez vos aventures",
      members: 23567,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=200&fit=crop",
      privacy: 'private',
      joined: true
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Groupes</h1>
            
            {/* Barre de recherche */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text"
                  placeholder="Rechercher des groupes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Bouton créer un groupe */}
            <div className="mb-6">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Créer un groupe</span>
              </button>
            </div>

            {/* Liste des groupes */}
            <div className="space-y-4">
              {groups.map((group) => (
                <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={group.image}
                      alt={group.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {group.name}
                          </h3>
                          <p className="text-gray-600 mt-1">{group.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">
                                {group.members.toLocaleString()} membres
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {group.privacy === 'public' ? (
                                <Globe className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Lock className="h-4 w-4 text-gray-500" />
                              )}
                              <span className="text-sm text-gray-600 capitalize">
                                {group.privacy === 'public' ? 'Public' : 'Privé'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          {group.joined ? (
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                              Membre
                            </button>
                          ) : (
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                              Rejoindre
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Groups;
