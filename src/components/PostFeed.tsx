
import { memo } from "react";
import { PostCard } from "./PostCard";
import { Post } from "@/pages/Index";
import { EmptyState } from "./EmptyState";
import { LoadingSpinner } from "./LoadingSpinner";
import { FileText } from "lucide-react";

interface PostFeedProps {
  posts: Post[];
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, comment: string) => void;
  onSharePost: (postId: string) => void;
  isLoading?: boolean;
}

export const PostFeed = memo(({ posts, onLikePost, onAddComment, onSharePost, isLoading }: PostFeedProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSpinner size="lg" text="Chargement des publications..." />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="h-16 w-16" />}
        title="Aucune publication"
        description="Il n'y a pas encore de publications. Soyez le premier à partager quelque chose !"
      />
    );
  }

  return (
    <div className="space-y-6" role="feed" aria-label="Fil d'actualité">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          onLike={() => onLikePost(post.id)}
          onAddComment={(comment) => onAddComment(post.id, comment)}
          onShare={() => onSharePost(post.id)}
        />
      ))}
    </div>
  );
});
