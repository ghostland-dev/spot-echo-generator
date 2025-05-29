
import { useState } from "react";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Post } from "@/pages/Index";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onAddComment: (comment: string) => void;
}

export const PostCard = ({ post, onLike, onAddComment }: PostCardProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* En-tête du post */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(post.timestamp, { addSuffix: true, locale: fr })}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contenu du post */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Image du post */}
      {post.image && (
        <div className="mx-4 mb-3">
          <img 
            src={post.image} 
            alt="Image du post"
            className="w-full rounded-lg object-cover max-h-96"
          />
        </div>
      )}

      {/* Statistiques */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            {post.likes > 0 && (
              <>
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <Heart className="h-3 w-3 text-white fill-current" />
                </div>
                <span>{post.likes}</span>
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
          <Button 
            variant="ghost" 
            className={`flex-1 ${post.liked ? 'text-blue-600' : 'text-gray-600'}`}
            onClick={onLike}
          >
            <Heart className={`h-4 w-4 mr-2 ${post.liked ? 'fill-current' : ''}`} />
            J'aime
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 text-gray-600"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Commenter
          </Button>
          <Button variant="ghost" className="flex-1 text-gray-600">
            <Share className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>
      </div>

      {/* Section commentaires */}
      {showComments && (
        <div className="border-t border-gray-100 p-4 space-y-3">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">
                  {comment.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <p className="font-semibold text-sm">{comment.author}</p>
                  <p className="text-sm">{comment.content}</p>
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
                className="rounded-full"
              />
              <Button 
                size="sm" 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
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
