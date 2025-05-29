
import { PostCard } from "./PostCard";
import { Post } from "@/pages/Index";

interface PostFeedProps {
  posts: Post[];
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, comment: string) => void;
  onSharePost: (postId: string) => void;
}

export const PostFeed = ({ posts, onLikePost, onAddComment, onSharePost }: PostFeedProps) => {
  return (
    <div className="space-y-6">
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
};
