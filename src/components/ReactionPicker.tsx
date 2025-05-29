
import { useState } from "react";
import { Heart, ThumbsUp, Laugh, Angry, Frown, Surprise } from "lucide-react";

interface Reaction {
  type: 'like' | 'love' | 'laugh' | 'angry' | 'sad' | 'wow';
  icon: React.ComponentType<any>;
  color: string;
  label: string;
}

interface ReactionPickerProps {
  onReact: (reactionType: string) => void;
  currentReaction?: string;
}

export const ReactionPicker = ({ onReact, currentReaction }: ReactionPickerProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const reactions: Reaction[] = [
    { type: 'like', icon: ThumbsUp, color: 'text-blue-600', label: 'J\'aime' },
    { type: 'love', icon: Heart, color: 'text-red-600', label: 'Amour' },
    { type: 'laugh', icon: Laugh, color: 'text-yellow-600', label: 'Rire' },
    { type: 'wow', icon: Surprise, color: 'text-orange-600', label: 'Wow' },
    { type: 'sad', icon: Frown, color: 'text-purple-600', label: 'Triste' },
    { type: 'angry', icon: Angry, color: 'text-red-700', label: 'Colère' }
  ];

  const currentReactionData = reactions.find(r => r.type === currentReaction);

  return (
    <div className="relative">
      <button
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          currentReaction 
            ? `${currentReactionData?.color} font-medium`
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onMouseEnter={() => setShowPicker(true)}
        onMouseLeave={() => setShowPicker(false)}
        onClick={() => onReact(currentReaction ? '' : 'like')}
      >
        {currentReactionData ? (
          <currentReactionData.icon className="h-4 w-4" />
        ) : (
          <ThumbsUp className="h-4 w-4" />
        )}
        <span>{currentReactionData?.label || 'J\'aime'}</span>
      </button>

      {showPicker && (
        <div 
          className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-lg border border-gray-200 px-2 py-1 flex space-x-1 z-10"
          onMouseEnter={() => setShowPicker(true)}
          onMouseLeave={() => setShowPicker(false)}
        >
          {reactions.map((reaction) => (
            <button
              key={reaction.type}
              onClick={() => {
                onReact(reaction.type);
                setShowPicker(false);
              }}
              className={`p-2 rounded-full hover:scale-125 transition-transform ${reaction.color}`}
              title={reaction.label}
            >
              <reaction.icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
