
export interface Notification {
  id: string;
  type: 'friend_request' | 'message' | 'mention' | 'like' | 'comment';
  title: string;
  message: string;
  avatar?: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  metadata?: {
    userId?: string;
    postId?: string;
    groupId?: string;
  };
}

export interface NotificationAction {
  label: string;
  action: 'accept' | 'decline' | 'view' | 'ignore';
  variant?: 'primary' | 'secondary' | 'destructive';
}
