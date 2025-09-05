
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PostCreator } from "@/components/PostCreator";
import { PostFeed } from "@/components/PostFeed";
import { Header } from "@/components/Header";
import { Stories } from "@/components/Stories";
import { OnlineContacts } from "@/components/OnlineContacts";
import { MobileNavigation } from "@/components/MobileNavigation";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { useToast } from "@/hooks/use-toast";

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: Array<{
    id: string;
    author: string;
    content: string;
  }>;
  timestamp: Date;
  liked: boolean;
}

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "Sophie Martin",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face"
      },
      content: "Magnifique coucher de soleil aujourd'hui ! 🌅 Parfait moment pour une pause détente.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&h=300&fit=crop",
      likes: 24,
      comments: [
        { id: "1", author: "Marc Dubois", content: "Superbe photo ! 📸" },
        { id: "2", author: "Julie Petit", content: "J'adore ce spot !" }
      ],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      liked: false
    },
    {
      id: "2",
      author: {
        name: "Thomas Leroy",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      content: "Nouveau projet de développement web terminé ! Très fier du résultat 💻✨",
      likes: 18,
      comments: [
        { id: "3", author: "Emma Wilson", content: "Félicitations ! 🎉" }
      ],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      liked: true
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

  const handleSharePost = (postId: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Publication Febspot',
        text: 'Découvrez cette publication sur Febspot',
        url: window.location.href + '?post=' + postId,
      });
    } else {
      navigator.clipboard.writeText(window.location.href + '?post=' + postId);
      toast({
        title: "Lien copié",
        description: "Le lien de la publication a été copié dans le presse-papiers",
      });
    }
  };

  // SEO and accessibility
  useEffect(() => {
    document.title = "Febspot - Accueil";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 
      "Découvrez les dernières publications de vos amis sur Febspot. Partagez vos moments et restez connecté."
    );
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6 max-w-2xl mx-auto" role="main">
          <Stories />
          <PostCreator onCreatePost={handleCreatePost} />
          <PostFeed 
            posts={posts} 
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
            onSharePost={handleSharePost}
            isLoading={isLoading}
          />
        </main>
        <OnlineContacts />
      </div>
      <MobileNavigation />
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
