
import { Circle } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

export const OnlineContacts = () => {
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sophie Martin",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
      isOnline: true
    },
    {
      id: "2",
      name: "Thomas Leroy",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: true
    },
    {
      id: "3",
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      lastSeen: "Il y a 5 min"
    },
    {
      id: "4",
      name: "Marc Dubois",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face",
      isOnline: true
    },
    {
      id: "5",
      name: "Julie Petit",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      lastSeen: "Il y a 12 min"
    }
  ];

  return (
    <div className="hidden xl:block w-80 p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Contacts</h3>
        
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div 
              key={contact.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <div className="relative">
                <img 
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {contact.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                {!contact.isOnline && contact.lastSeen && (
                  <p className="text-xs text-gray-500">{contact.lastSeen}</p>
                )}
              </div>
              
              <Circle className="h-2 w-2 text-green-500 fill-current" />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Groupes</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">DW</span>
              </div>
              <span className="text-gray-900 font-medium">Développement Web</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">PH</span>
              </div>
              <span className="text-gray-900 font-medium">Photographie</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
