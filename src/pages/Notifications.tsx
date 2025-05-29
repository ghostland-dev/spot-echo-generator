
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { NotificationItem } from "@/components/NotificationItem";
import { NotificationFilter } from "@/components/NotificationFilter";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "@/components/ui/button";
import { CheckCheck, Settings, Trash2 } from "lucide-react";

const Notifications = () => {
  const {
    notifications,
    allNotifications,
    unreadCount,
    filter,
    setFilter,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    handleFriendRequest
  } = useNotifications();

  // Calculate filter counts
  const filterCounts = {
    all: allNotifications.length,
    unread: allNotifications.filter(n => !n.isRead).length,
    friend_request: allNotifications.filter(n => n.type === 'friend_request').length,
    like: allNotifications.filter(n => n.type === 'like').length,
    comment: allNotifications.filter(n => n.type === 'comment').length,
    message: allNotifications.filter(n => n.type === 'message').length,
    mention: allNotifications.filter(n => n.type === 'mention').length,
  };

  const getFilterTitle = () => {
    switch (filter) {
      case 'unread': return 'Notifications non lues';
      case 'friend_request': return 'Demandes d\'ami';
      case 'like': return 'J\'aime';
      case 'comment': return 'Commentaires';
      case 'message': return 'Messages';
      case 'mention': return 'Mentions';
      default: return 'Notifications';
    }
  };

  const clearAllNotifications = () => {
    allNotifications.forEach(notification => {
      deleteNotification(notification.id);
    });
  };

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
                    <h1 className="text-2xl font-bold text-gray-900">{getFilterTitle()}</h1>
                    <p className="text-sm text-gray-600 mt-1">
                      {notifications.length} notification{notifications.length > 1 ? 's' : ''}
                      {filter === 'all' && unreadCount > 0 && (
                        <span className="ml-2 text-blue-600">
                          ({unreadCount} non lue{unreadCount > 1 ? 's' : ''})
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <NotificationFilter
                      currentFilter={filter}
                      onFilterChange={setFilter}
                      counts={filterCounts}
                    />
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Paramètres
                    </Button>
                  </div>
                </div>
                
                {/* Actions supplémentaires */}
                {allNotifications.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR')}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllNotifications}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Tout supprimer
                      </Button>
                    </div>
                  </div>
                )}
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
                      {filter === 'all' ? 'Aucune notification' : `Aucune notification de type "${getFilterTitle().toLowerCase()}"`}
                    </h3>
                    <p className="text-gray-600">
                      {filter === 'all' 
                        ? 'Vous êtes à jour ! Aucune nouvelle notification.'
                        : 'Aucune notification de ce type pour le moment.'
                      }
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
