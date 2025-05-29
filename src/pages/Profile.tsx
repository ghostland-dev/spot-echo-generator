
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DynamicOnlineContacts } from "@/components/DynamicOnlineContacts";
import { PostCreator } from "@/components/PostCreator";
import { PostFeed } from "@/components/PostFeed";
import { usePosts } from "@/hooks/usePosts";
import { Camera, MapPin, Briefcase, Heart, Users, Settings, Edit, Calendar, Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Profile = () => {
  const { posts, handleCreatePost, handleLikePost, handleAddComment, handleSharePost } = usePosts();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isEditing, setIsEditing] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
        {!isMobile && <Sidebar />}
        
        {/* Mobile Menu Overlay */}
        {isMobile && showMobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
            <div className="bg-white w-80 h-full p-4 animate-slide-in-right">
              <Button 
                variant="ghost" 
                onClick={() => setShowMobileMenu(false)}
                className="mb-4"
              >
                Fermer
              </Button>
              <Sidebar />
            </div>
          </div>
        )}

        <main className="flex-1 px-2 sm:px-4 py-4 sm:py-6 max-w-4xl mx-auto">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button 
              variant="outline" 
              onClick={() => setShowMobileMenu(true)}
              className="mb-4 lg:hidden"
            >
              <Menu className="h-4 w-4 mr-2" />
              Menu
            </Button>
          )}

          {/* Couverture et photo de profil */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden animate-fade-in">
            <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
              <button 
                onClick={handleCoverPhotoClick}
                className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white bg-opacity-90 p-2 rounded-lg hover:bg-opacity-100 transition-all flex items-center space-x-2 hover-scale"
              >
                <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">
                  Modifier la couverture
                </span>
              </button>
            </div>
            <div className="relative px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-12 sm:-mt-16">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Photo de profil"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg hover-scale"
                  />
                  <button 
                    onClick={handleProfilePhotoClick}
                    className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-gray-200 p-1.5 sm:p-2 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex-1 pt-0 sm:pt-6 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{profileData.name}</h1>
                      <p className="text-gray-600 mt-1 text-sm sm:text-base">{profileData.bio}</p>
                      <div className="flex items-center justify-center sm:justify-start space-x-4 mt-2">
                        <span className="text-xs sm:text-sm text-gray-600">1,234 amis</span>
                        <span className="text-xs sm:text-sm text-gray-600">•</span>
                        <span className="text-xs sm:text-sm text-gray-600">156 publications</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                    <Button onClick={handleEditProfile} className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto">
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Sauvegarder' : 'Modifier le profil'}
                    </Button>
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <Button variant="outline" className="text-gray-700 flex-1 sm:flex-none">
                        <Settings className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Paramètres</span>
                      </Button>
                      <Button variant="outline" className="text-gray-700 flex-1 sm:flex-none">
                        <Globe className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Voir en tant que...</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 animate-fade-in">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 text-center hover-scale">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-xs sm:text-sm text-gray-600">Amis</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 text-center hover-scale">
              <div className="text-lg sm:text-2xl font-bold text-green-600">156</div>
              <div className="text-xs sm:text-sm text-gray-600">Publications</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 text-center hover-scale">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">2,847</div>
              <div className="text-xs sm:text-sm text-gray-600">J'aime reçus</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 text-center hover-scale">
              <div className="text-lg sm:text-2xl font-bold text-orange-600">42</div>
              <div className="text-xs sm:text-sm text-gray-600">Groupes</div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="lg:col-span-1 space-y-4 lg:space-y-6">
              {/* Informations personnelles */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{profileData.job}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{profileData.relationship}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">{profileData.joinDate}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">1,234 amis</span>
                  </div>
                </div>
              </div>

              {/* Photos récentes */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 animate-fade-in">
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

            <div className="lg:col-span-2 space-y-4 lg:space-y-6">
              <div className="animate-fade-in">
                <PostCreator onCreatePost={handleCreatePost} />
              </div>
              <div className="animate-fade-in">
                <PostFeed 
                  posts={posts.filter(post => post.author.name === "Vous")} 
                  onLikePost={handleLikePost}
                  onAddComment={handleAddComment}
                  onSharePost={handleSharePost}
                />
              </div>
            </div>
          </div>
        </main>
        {!isMobile && <DynamicOnlineContacts />}
      </div>
    </div>
  );
};

export default Profile;
