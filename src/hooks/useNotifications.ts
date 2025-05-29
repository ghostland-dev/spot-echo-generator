
import { useState, useEffect } from 'react';
import { Notification } from '@/types/notifications';

// Données simulées pour la démonstration
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'friend_request',
    title: 'Nouvelle demande d\'ami',
    message: 'Sarah Martin souhaite vous ajouter comme ami',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=40&h=40&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: false,
    metadata: { userId: 'sarah-martin' }
  },
  {
    id: '2',
    type: 'like',
    title: 'J\'aime sur votre publication',
    message: 'Alex Dubois et 12 autres personnes ont aimé votre photo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    metadata: { postId: 'post-123' }
  },
  {
    id: '3',
    type: 'comment',
    title: 'Nouveau commentaire',
    message: 'Marie Legrand a commenté votre publication',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true,
    metadata: { postId: 'post-456' }
  },
  {
    id: '4',
    type: 'message',
    title: 'Nouveau message',
    message: 'Thomas Bernard vous a envoyé un message',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    metadata: { userId: 'thomas-bernard' }
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleFriendRequest = (id: string, action: 'accept' | 'decline') => {
    console.log(`Friend request ${action}ed for notification ${id}`);
    deleteNotification(id);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    handleFriendRequest
  };
};
