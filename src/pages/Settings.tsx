
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { User, Lock, Bell, Eye, Shield, HelpCircle } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Général', icon: User },
    { id: 'privacy', label: 'Confidentialité', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Apparence', icon: Eye },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'help', label: 'Aide', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Menu des paramètres */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <nav className="space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <tab.icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Contenu des paramètres */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {activeTab === 'general' && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Paramètres généraux</h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom d'utilisateur
                          </label>
                          <input 
                            type="text"
                            defaultValue="Votre Profil"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input 
                            type="email"
                            defaultValue="votre.email@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                          </label>
                          <textarea 
                            rows={3}
                            defaultValue="Passionné de technologie et de voyages ✈️"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'privacy' && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Confidentialité</h2>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Profil public</h3>
                            <p className="text-sm text-gray-500">Permettre aux autres de voir votre profil</p>
                          </div>
                          <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Messages privés</h3>
                            <p className="text-sm text-gray-500">Recevoir des messages de tous les utilisateurs</p>
                          </div>
                          <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Notifications push</h3>
                            <p className="text-sm text-gray-500">Recevoir des notifications sur votre appareil</p>
                          </div>
                          <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">Notifications email</h3>
                            <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
                          </div>
                          <input type="checkbox" className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Enregistrer les modifications
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
