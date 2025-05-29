
import { MessageCircle, Phone, Video } from "lucide-react";
import { useOnlineUsers } from "@/hooks/useOnlineUsers";
import { useToast } from "@/hooks/use-toast";

export const DynamicOnlineContacts = () => {
  const { onlineUsers, onlineCount } = useOnlineUsers();
  const { toast } = useToast();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'active': return 'En ligne';
      case 'away': return 'Absent';
      case 'busy': return 'Occupé';
      default: return 'En ligne';
    }
  };

  const handleMessage = (userName: string) => {
    toast({
      title: "Message envoyé",
      description: `Conversation ouverte avec ${userName}`,
    });
  };

  const handleCall = (userName: string) => {
    toast({
      title: "Appel en cours",
      description: `Appel audio vers ${userName}...`,
    });
  };

  const handleVideoCall = (userName: string) => {
    toast({
      title: "Appel vidéo",
      description: `Appel vidéo vers ${userName}...`,
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 hidden lg:block">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Contacts en ligne ({onlineCount})
        </h3>
      </div>
      
      <div className="space-y-3">
        {onlineUsers.map((user) => (
          <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{getStatusText(user.status)}</p>
            </div>
            <div className="flex space-x-1">
              <button 
                onClick={() => handleMessage(user.name)}
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Envoyer un message"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleCall(user.name)}
                className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                title="Appeler"
              >
                <Phone className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleVideoCall(user.name)}
                className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                title="Appel vidéo"
              >
                <Video className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
