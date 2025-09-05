import { useState, memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getOptimizedImageUrl } from '@/utils/performance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  placeholder?: boolean;
}

export const OptimizedImage = memo(({
  src,
  alt,
  className = "",
  width = 400,
  height,
  quality = 80,
  placeholder = true,
}: OptimizedImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const optimizedSrc = getOptimizedImageUrl(src, width, quality);

  if (loading && placeholder) {
    return (
      <Skeleton 
        className={`${className} ${height ? `h-${height}` : 'aspect-video'}`} 
      />
    );
  }

  if (error) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground text-sm">Image non disponible</span>
      </div>
    );
  }

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoading(false)}
      onError={() => {
        setLoading(false);
        setError(true);
      }}
    />
  );
});