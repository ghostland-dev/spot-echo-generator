
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { OnlineContacts } from "@/components/OnlineContacts";
import { PostCreator } from "@/components/PostCreator";
import { PostFeed } from "@/components/PostFeed";
import { Camera, MapPin, Briefcase, Heart, Users, Settings } from "lucide-react";
import { Post } from "./Index";

const Profile = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "profile-1",
      author: {
        name: "Vous",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: "Merci à tous pour les vœux d'anniversaire ! 🎉 Une journée formidable entourée de mes proches.",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&h=300&fit=crop",
      likes: 42,
      comments: [
        { id: "1", author: "Sophie Martin", content: "Joyeux anniversaire ! 🎂" },
        { id: "2", author: "Thomas Leroy", content: "Profite bien de ta journée !" }
      ],
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      liked: false
    }
  ]);

  const handleCreatePost = (content: string, image?: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: "Vous",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content,
      image,
      likes: 0,
      comments: [],
      timestamp: new Date(),
      liked: false
    };
    setPosts([newPost, ...posts]);
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleAddComment = (postId: string, comment: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: [...post.comments, { 
              id: Date.now().toString(), 
              author: "Vous", 
              content: comment 
            }] 
          }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6 max-w-4xl mx-auto">
          {/* Couverture et photo de profil */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div className="relative h-80 bg-gradient-to-r from-blue-500 to-purple-600">
              <button className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-2 rounded-lg hover:bg-opacity-100 transition-all">
                <Camera className="h-5 w-5 text-gray-700" />
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
                  <button className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors">
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="flex-1 pt-6">
                  <h1 className="text-3xl font-bold text-gray-900">Votre Profil</h1>
                  <p className="text-gray-600 mt-1">1,234 amis</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Modifier le profil
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                      <Settings className="h-4 w-4 inline mr-2" />
                      Paramètres
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations personnelles */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Développeur Web chez TechCorp</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Paris, France</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">En couple</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">1,234 amis</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <PostCreator onCreatePost={handleCreatePost} />
              <PostFeed 
                posts={posts} 
                onLikePost={handleLikePost}
                onAddComment={handleAddComment}
              />
            </div>
          </div>
        </main>
        <OnlineContacts />
      </div>
    </div>
  );
};

export default Profile;
