
import { useState, useEffect } from 'react';
import { Notification } from '@/types/notifications';
import { useToast } from '@/hooks/use-toast';

// Générateur de notifications simulées plus réalistes
const generateRandomNotification = (): Notification => {
  const types = ['friend_request', 'like', 'comment', 'message', 'mention'];
  const users = [
    { name: 'Sophie Martin', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=40&h=40&fit=crop&crop=face' },
    { name: 'Alex Dubois', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    { name: 'Marie Legrand', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
    { name: 'Thomas Bernard', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    { name: 'Julie Moreau', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face' },
    { name: 'Pierre Dupont', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' },
    { name: 'Emma Rousseau', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face' },
    { name: 'Lucas Martin', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face' }
  ];

  const type = types[Math.floor(Math.random() * types.length)] as any;
  const user = users[Math.floor(Math.random() * users.length)];
  
  const messages = {
    friend_request: `${user.name} souhaite vous ajouter comme ami`,
    like: `${user.name} et ${Math.floor(Math.random() * 20) + 1} autres personnes ont aimé votre publication`,
    comment: `${user.name} a commenté votre publication`,
    message: `${user.name} vous a envoyé un message`,
    mention: `${user.name} vous a mentionné dans un commentaire`
  };

  const titles = {
    friend_request: 'Nouvelle demande d\'ami',
    like: 'J\'aime sur votre publication',
    comment: 'Nouveau commentaire',
    message: 'Nouveau message',
    mention: 'Mention dans un commentaire'
  };

  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    type,
    title: titles[type],
    message: messages[type],
    avatar: user.avatar,
    timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
    isRead: Math.random() > 0.6,
    metadata: { userId: user.name.toLowerCase().replace(' ', '-') }
  };
};

// Données initiales plus variées
const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'friend_request',
    title: 'Nouvelle demande d\'ami',
    message: 'Sarah Martin souhaite vous ajouter comme ami',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=40&h=40&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isRead: false,
    metadata: { userId: 'sarah-martin' }
  },
  {
    id: '2',
    type: 'like',
    title: 'J\'aime sur votre publication',
    message: 'Alex Dubois et 12 autres personnes ont aimé votre photo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    metadata: { postId: 'post-123' }
  },
  {
    id: '3',
    type: 'comment',
    title: 'Nouveau commentaire',
    message: 'Marie Legrand a commenté votre publication',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isRead: true,
    metadata: { postId: 'post-456' }
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'friend_request' | 'like' | 'comment' | 'message' | 'mention'>('all');
  const { toast } = useToast();

  // Simulation de nouvelles notifications en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      // Ajouter une nouvelle notification aléatoirement (30% de chance toutes les 10 secondes)
      if (Math.random() > 0.7) {
        const newNotification = generateRandomNotification();
        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Garder max 20 notifications
        
        // Toast pour nouvelle notification
        toast({
          title: newNotification.title,
          description: newNotification.message,
          duration: 3000,
        });
      }
    }, 10000); // Toutes les 10 secondes

    return () => clearInterval(interval);
  }, [toast]);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    toast({
      title: "Notification marquée comme lue",
      description: "La notification a été marquée comme lue.",
    });
  };

  const markAllAsRead = () => {
    const unreadNotifications = notifications.filter(n => !n.isRead);
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast({
      title: "Toutes les notifications marquées comme lues",
      description: `${unreadNotifications.length} notification(s) marquée(s) comme lue(s).`,
    });
  };

  const deleteNotification = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast({
      title: "Notification supprimée",
      description: notification ? `"${notification.title}" a été supprimée.` : "La notification a été supprimée.",
    });
  };

  const handleFriendRequest = (id: string, action: 'accept' | 'decline') => {
    const notification = notifications.find(n => n.id === id);
    console.log(`Friend request ${action}ed for notification ${id}`);
    deleteNotification(id);
    
    if (action === 'accept') {
      toast({
        title: "Demande d'ami acceptée",
        description: notification ? `Vous êtes maintenant ami avec ${notification.message.split(' ')[0]}.` : "La demande d'ami a été acceptée.",
      });
    } else {
      toast({
        title: "Demande d'ami refusée",
        description: "La demande d'ami a été refusée.",
      });
    }
  };

  return {
    notifications: filteredNotifications,
    allNotifications: notifications,
    unreadCount,
    filter,
    setFilter,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    handleFriendRequest
  };
};
