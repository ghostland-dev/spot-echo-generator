
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PostCreator } from "@/components/PostCreator";
import { PostFeed } from "@/components/PostFeed";
import { Header } from "@/components/Header";

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
        <main className="flex-1 px-4 py-6 max-w-2xl mx-auto">
          <PostCreator onCreatePost={handleCreatePost} />
          <PostFeed 
            posts={posts} 
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
