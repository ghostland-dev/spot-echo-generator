import { useState } from "react";
import { MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Post } from "@/pages/Index";
import { ReactionPicker } from "@/components/ReactionPicker";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onAddComment: (comment: string) => void;
  onShare: () => void;
}

export const PostCard = ({ post, onLike, onAddComment, onShare }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [currentReaction, setCurrentReaction] = useState<string>(post.liked ? 'like' : '');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment("");
    }
  };

  const handleReaction = (reactionType: string) => {
    setCurrentReaction(reactionType);
    onLike();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* En-tête du post */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-10 h-10 rounded-full ring-2 ring-gray-100"
            />
            <div>
              <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer">{post.author.name}</h3>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(post.timestamp, { addSuffix: true, locale: fr })}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contenu du post */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{post.content}</p>
      </div>

      {/* Image du post */}
      {post.image && (
        <div className="mx-4 mb-3">
          <img 
            src={post.image} 
            alt="Image du post"
            className="w-full rounded-lg object-cover max-h-96 cursor-pointer hover:opacity-95 transition-opacity"
          />
        </div>
      )}

      {/* Statistiques */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            {post.likes > 0 && (
              <>
                <div className="flex -space-x-1">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border border-white">
                    <span className="text-white text-xs">👍</span>
                  </div>
                  <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center border border-white">
                    <span className="text-white text-xs">❤️</span>
                  </div>
                </div>
                <span className="ml-2">{post.likes}</span>
              </>
            )}
          </div>
          <div className="flex space-x-4">
            {post.comments.length > 0 && (
              <button 
                onClick={() => setShowComments(!showComments)}
                className="hover:underline"
              >
                {post.comments.length} commentaire{post.comments.length > 1 ? 's' : ''}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex space-x-1">
          <ReactionPicker 
            onReact={handleReaction}
            currentReaction={currentReaction}
          />
          <Button 
            variant="ghost" 
            className="flex-1 text-gray-600 hover:bg-gray-100"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Commenter
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 text-gray-600 hover:bg-gray-100"
            onClick={onShare}
          >
            <Share className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>
      </div>

      {/* Section commentaires */}
      {showComments && (
        <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {comment.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
                  <p className="font-semibold text-sm text-blue-600">{comment.author}</p>
                  <p className="text-sm text-gray-900">{comment.content}</p>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                  <button className="hover:underline">J'aime</button>
                  <button className="hover:underline">Répondre</button>
                  <span>Il y a quelques minutes</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Ajouter un commentaire */}
          <div className="flex space-x-3 mt-3">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
              alt="Votre avatar" 
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 flex space-x-2">
              <Input
                placeholder="Écrivez un commentaire..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                className="rounded-full bg-white"
              />
              <Button 
                size="sm" 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Publier
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
