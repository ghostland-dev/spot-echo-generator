
import { useState, useEffect } from 'react';

export interface OnlineUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
  status?: 'active' | 'away' | 'busy';
}

const mockUsers: OnlineUser[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=40&h=40&fit=crop&crop=face',
    isOnline: true,
    status: 'active'
  },
  {
    id: '2',
    name: 'Alex Dubois',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    isOnline: true,
    status: 'active'
  },
  {
    id: '3',
    name: 'Marie Legrand',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    isOnline: false,
    lastSeen: new Date(Date.now() - 15 * 60 * 1000)
  },
  {
    id: '4',
    name: 'Thomas Bernard',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    isOnline: true,
    status: 'away'
  },
  {
    id: '5',
    name: 'Julie Moreau',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face',
    isOnline: true,
    status: 'busy'
  },
  {
    id: '6',
    name: 'Pierre Dupont',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
  }
];

export const useOnlineUsers = () => {
  const [users, setUsers] = useState<OnlineUser[]>(mockUsers);

  // Simulation du changement de statut des utilisateurs
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers(prev => prev.map(user => {
        // 10% de chance de changer de statut
        if (Math.random() > 0.9) {
          if (user.isOnline) {
            // Peut devenir offline ou changer de statut
            if (Math.random() > 0.7) {
              return {
                ...user,
                isOnline: false,
                lastSeen: new Date(),
                status: undefined
              };
            } else {
              const statuses: ('active' | 'away' | 'busy')[] = ['active', 'away', 'busy'];
              return {
                ...user,
                status: statuses[Math.floor(Math.random() * statuses.length)]
              };
            }
          } else {
            // Peut devenir online
            if (Math.random() > 0.5) {
              return {
                ...user,
                isOnline: true,
                status: 'active',
                lastSeen: undefined
              };
            }
          }
        }
        return user;
      }));
    }, 15000); // Toutes les 15 secondes

    return () => clearInterval(interval);
  }, []);

  const onlineUsers = users.filter(user => user.isOnline);
  const onlineCount = onlineUsers.length;

  return {
    users,
    onlineUsers,
    onlineCount
  };
};
