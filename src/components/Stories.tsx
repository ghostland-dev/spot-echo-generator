
import { Plus } from "lucide-react";

interface Story {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  viewed: boolean;
}

export const Stories = () => {
  const stories: Story[] = [
    {
      id: "1",
      user: {
        name: "Sophie Martin",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face"
      },
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&h=400&fit=crop",
      viewed: false
    },
    {
      id: "2",
      user: {
        name: "Thomas Leroy",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop",
      viewed: true
    },
    {
      id: "3",
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      },
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=400&fit=crop",
      viewed: false
    },
    {
      id: "4",
      user: {
        name: "Marc Dubois",
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face"
      },
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=400&fit=crop",
      viewed: false
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {/* Votre story */}
        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-0.5 cursor-pointer hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
                alt="Votre story"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
              <Plus className="h-3 w-3 text-white" />
            </div>
          </div>
          <p className="text-xs text-center mt-2 font-medium">Votre story</p>
        </div>

        {/* Stories des amis */}
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            <div className={`relative w-20 h-20 rounded-full p-0.5 cursor-pointer hover:scale-105 transition-transform ${
              story.viewed 
                ? 'bg-gray-300' 
                : 'bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500'
            }`}>
              <div className="w-full h-full rounded-full bg-white p-0.5">
                <img 
                  src={story.user.avatar}
                  alt={`Story de ${story.user.name}`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <p className="text-xs text-center mt-2 max-w-[80px] truncate">
              {story.user.name.split(' ')[0]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
