
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Check, X, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Notification } from '@/types/notifications';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onFriendRequest?: (id: string, action: 'accept' | 'decline') => void;
}

export const NotificationItem = ({
  notification,
  onMarkAsRead,
  onDelete,
  onFriendRequest
}: NotificationItemProps) => {
  const timeAgo = formatDistanceToNow(notification.timestamp, {
    addSuffix: true,
    locale: fr
  });

  const getNotificationIcon = () => {
    const iconClass = "h-4 w-4";
    switch (notification.type) {
      case 'friend_request':
        return <div className="w-2 h-2 bg-blue-500 rounded-full" />;
      case 'like':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      case 'comment':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'message':
        return <div className="w-2 h-2 bg-purple-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />;
    }
  };

  return (
    <div className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
      !notification.isRead ? 'bg-blue-50' : ''
    }`}>
      <div className="flex items-start space-x-3">
        <div className="relative">
          <img
            src={notification.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="absolute -top-1 -right-1">
            {getNotificationIcon()}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={`text-sm font-medium text-gray-900 ${
                !notification.isRead ? 'font-semibold' : ''
              }`}>
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {timeAgo}
              </p>
            </div>

            <div className="flex items-center space-x-1 ml-4">
              {!notification.isRead && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onMarkAsRead(notification.id)}
                  className="h-8 w-8"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(notification.id)}
                className="h-8 w-8 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {notification.type === 'friend_request' && onFriendRequest && (
            <div className="flex space-x-2 mt-3">
              <Button
                size="sm"
                onClick={() => onFriendRequest(notification.id, 'accept')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Check className="h-4 w-4 mr-1" />
                Accepter
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onFriendRequest(notification.id, 'decline')}
              >
                <X className="h-4 w-4 mr-1" />
                Refuser
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
