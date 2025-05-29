
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DynamicOnlineContacts } from "@/components/DynamicOnlineContacts";
import { PostCreator } from "@/components/PostCreator";
import { PostFeed } from "@/components/PostFeed";
import { usePosts } from "@/hooks/usePosts";
import { Camera, MapPin, Briefcase, Heart, Users, Settings, Edit, Calendar, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { posts, handleCreatePost, handleLikePost, handleAddComment, handleSharePost } = usePosts();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Votre Profil",
    bio: "Développeur passionné | Amoureux de la technologie | Paris",
    job: "Développeur Web chez TechCorp",
    location: "Paris, France",
    relationship: "En couple",
    joinDate: "Membre depuis Mars 2020"
  });

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été sauvegardées.",
      });
    }
  };

  const handleCoverPhotoClick = () => {
    toast({
      title: "Changer la photo de couverture",
      description: "Fonctionnalité à venir...",
    });
  };

  const handleProfilePhotoClick = () => {
    toast({
      title: "Changer la photo de profil",
      description: "Fonctionnalité à venir...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6 max-w-4xl mx-auto">
          {/* Couverture et photo de profil */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div className="relative h-80 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
              <button 
                onClick={handleCoverPhotoClick}
                className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-2 rounded-lg hover:bg-opacity-100 transition-all flex items-center space-x-2"
              >
                <Camera className="h-5 w-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">Modifier la couverture</span>
              </button>
            </div>
            <div className="relative px-6 pb-6">
              <div className="flex items-end space-x-6 -mt-16">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Photo de profil"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  <button 
                    onClick={handleProfilePhotoClick}
                    className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex-1 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                      <p className="text-gray-600 mt-1">{profileData.bio}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-600">1,234 amis</span>
                        <span className="text-sm text-gray-600">•</span>
                        <span className="text-sm text-gray-600">156 publications</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4">
                    <Button onClick={handleEditProfile} className="bg-blue-600 text-white hover:bg-blue-700">
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Sauvegarder' : 'Modifier le profil'}
                    </Button>
                    <Button variant="outline" className="text-gray-700">
                      <Settings className="h-4 w-4 mr-2" />
                      Paramètres
                    </Button>
                    <Button variant="outline" className="text-gray-700">
                      <Globe className="h-4 w-4 mr-2" />
                      Voir en tant que...
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-gray-600">Amis</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-gray-600">Publications</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">2,847</div>
              <div className="text-sm text-gray-600">J'aime reçus</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">42</div>
              <div className="text-sm text-gray-600">Groupes</div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              {/* Informations personnelles */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{profileData.job}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{profileData.relationship}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{profileData.joinDate}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">1,234 amis</span>
                  </div>
                </div>
              </div>

              {/* Photos récentes */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Photos</h3>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    Voir tout
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=100&h=100&fit=crop`}
                        alt={`Photo ${i}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <PostCreator onCreatePost={handleCreatePost} />
              <PostFeed 
                posts={posts.filter(post => post.author.name === "Vous")} 
                onLikePost={handleLikePost}
                onAddComment={handleAddComment}
                onSharePost={handleSharePost}
              />
            </div>
          </div>
        </main>
        <DynamicOnlineContacts />
      </div>
    </div>
  );
};

export default Profile;
