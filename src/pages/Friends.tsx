
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Search, UserPlus, MessageCircle, MoreHorizontal } from "lucide-react";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
  isOnline: boolean;
  status?: string;
}

const Friends = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [friends] = useState<Friend[]>([
    {
      id: "1",
      name: "Sophie Martin",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 12,
      isOnline: true,
      status: "En ligne"
    },
    {
      id: "2",
      name: "Thomas Leroy",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 8,
      isOnline: false,
      status: "Hors ligne depuis 2h"
    },
    {
      id: "3",
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 15,
      isOnline: true,
      status: "En ligne"
    },
    {
      id: "4",
      name: "Marc Dubois",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face",
      mutualFriends: 6,
      isOnline: false,
      status: "Hors ligne depuis 1j"
    }
  ]);

  const tabs = [
    { id: 'all', label: 'Tous les amis', count: friends.length },
    { id: 'online', label: 'En ligne', count: friends.filter(f => f.isOnline).length },
    { id: 'requests', label: 'Demandes', count: 3 }
  ];

  const filteredFriends = friends.filter(friend => {
    if (activeTab === 'online') return friend.isOnline;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Amis</h1>
            
            {/* Onglets */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>
              
              {/* Barre de recherche */}
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input 
                    type="text"
                    placeholder="Rechercher des amis..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Liste des amis */}
            {activeTab !== 'requests' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFriends.map((friend) => (
                  <div key={friend.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative">
                        <img 
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-12 h-12 rounded-full"
                        />
                        {friend.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{friend.name}</h3>
                        <p className="text-sm text-gray-500">{friend.mutualFriends} amis en commun</p>
                        <p className="text-xs text-gray-400">{friend.status}</p>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">Message</span>
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <UserPlus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Demandes d'amis */
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Demandes d'amis</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=150&h=150&fit=crop&crop=face`}
                          alt={`Utilisateur ${i}`}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">Utilisateur {i}</h4>
                          <p className="text-sm text-gray-500">5 amis en commun</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Accepter
                        </button>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                          Refuser
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Friends;
