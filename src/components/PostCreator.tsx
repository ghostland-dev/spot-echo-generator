
import { useState } from "react";
import { Image, Smile, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PostCreatorProps {
  onCreatePost: (content: string, image?: string) => void;
}

export const PostCreator = ({ onCreatePost }: PostCreatorProps) => {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost(content.trim());
      setContent("");
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex space-x-3">
        <img 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
          alt="Votre avatar" 
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <Textarea
            placeholder="Quoi de neuf ?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="border-none resize-none focus-visible:ring-0 text-lg placeholder:text-gray-500"
            rows={isExpanded ? 3 : 1}
          />
          
          {isExpanded && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Image className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Photo/Vidéo</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Smile className="h-5 w-5 text-yellow-600" />
                    <span className="text-gray-700">Sentiment</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <span className="text-gray-700">Lieu</span>
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsExpanded(false);
                    setContent("");
                  }}
                >
                  Annuler
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Publier
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
