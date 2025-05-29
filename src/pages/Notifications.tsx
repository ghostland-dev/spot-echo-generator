
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { NotificationItem } from "@/components/NotificationItem";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { CheckCheck, Filter } from "lucide-react";

const Notifications = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    handleFriendRequest
  } = useNotifications();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Header des notifications */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    {unreadCount > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filtrer
                    </Button>
                    {unreadCount > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-blue-600"
                      >
                        <CheckCheck className="h-4 w-4 mr-2" />
                        Tout marquer comme lu
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Liste des notifications */}
              <div className="divide-y divide-gray-200">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                      onFriendRequest={handleFriendRequest}
                    />
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCheck className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aucune notification
                    </h3>
                    <p className="text-gray-600">
                      Vous êtes à jour ! Aucune nouvelle notification.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
