
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: Date;
  liked: boolean;
  shares?: number;
  location?: string;
  privacy: 'public' | 'friends' | 'private';
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp?: Date;
  likes?: number;
}

const generateRandomPost = (): Post => {
  const authors = [
    { name: 'Sophie Martin', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=40&h=40&fit=crop&crop=face' },
    { name: 'Alex Dubois', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    { name: 'Marie Legrand', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
    { name: 'Thomas Bernard', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { name: 'Julie Moreau', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face' }
  ];

  const contents = [
    "Belle journée au parc avec les amis ! 🌞",
    "Nouveau projet terminé, très fier du résultat 💪",
    "Qui veut aller prendre un café demain ? ☕",
    "Magnifique coucher de soleil ce soir 🌅",
    "Weekend détente bien mérité ! 😌",
    "Nouvelle recette testée, un délice ! 🍽️",
    "Concert incroyable hier soir 🎵",
    "Vacances qui se terminent trop vite... ✈️"
  ];

  const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=500&h=300&fit=crop'
  ];

  const author = authors[Math.floor(Math.random() * authors.length)];
  const content = contents[Math.floor(Math.random() * contents.length)];
  const hasImage = Math.random() > 0.4;

  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    author,
    content,
    image: hasImage ? images[Math.floor(Math.random() * images.length)] : undefined,
    likes: Math.floor(Math.random() * 50),
    comments: [],
    timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
    liked: false,
    shares: Math.floor(Math.random() * 10),
    privacy: Math.random() > 0.2 ? 'public' : 'friends'
  };
};

const initialPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Sophie Martin",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face"
    },
    content: "Magnifique coucher de soleil depuis ma terrasse ! 🌅 Rien de mieux pour terminer cette belle journée.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    likes: 24,
    comments: [
      { id: "1", author: "Alex Dubois", content: "Sublime ! 📸" },
      { id: "2", author: "Marie Legrand", content: "J'adore ces couleurs !" }
    ],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    liked: false,
    shares: 3,
    privacy: 'public'
  },
  {
    id: "2",
    author: {
      name: "Alex Dubois",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    content: "Nouveau projet web terminé ! Très fier du résultat 💻✨ #WebDev #Proud",
    likes: 31,
    comments: [
      { id: "3", author: "Thomas Bernard", content: "Félicitations ! 🎉" },
      { id: "4", author: "Julie Moreau", content: "Hâte de voir ça !" }
    ],
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    liked: true,
    shares: 5,
    privacy: 'public'
  }
];

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const { toast } = useToast();

  // Simulation de nouveaux posts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% de chance toutes les 20 secondes
        const newPost = generateRandomPost();
        setPosts(prev => [newPost, ...prev.slice(0, 19)]); // Garder max 20 posts
      }
    }, 20000);

    return () => clearInterval(interval);
  }, []);

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
      liked: false,
      shares: 0,
      privacy: 'public'
    };
    setPosts([newPost, ...posts]);
    toast({
      title: "Publication créée",
      description: "Votre publication a été partagée avec succès !",
    });
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
              content: comment,
              timestamp: new Date(),
              likes: 0
            }] 
          }
        : post
    ));
    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été publié !",
    });
  };

  const handleSharePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: (post.shares || 0) + 1 }
        : post
    ));
    toast({
      title: "Publication partagée",
      description: "La publication a été partagée !",
    });
  };

  return {
    posts,
    handleCreatePost,
    handleLikePost,
    handleAddComment,
    handleSharePost
  };
};
