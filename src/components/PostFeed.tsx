
import { PostCard } from "./PostCard";
import { Post } from "@/pages/Index";

interface PostFeedProps {
  posts: Post[];
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, comment: string) => void;
}

export const PostFeed = ({ posts, onLikePost, onAddComment }: PostFeedProps) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          onLike={() => onLikePost(post.id)}
          onAddComment={(comment) => onAddComment(post.id, comment)}
        />
      ))}
    </div>
  );
};
