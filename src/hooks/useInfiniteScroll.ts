import { useEffect, useState, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({ 
  threshold = 100, 
  hasMore, 
  onLoadMore 
}: UseInfiniteScrollOptions) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - threshold && hasMore && !isFetching) {
      setIsFetching(true);
      onLoadMore();
    }
  }, [threshold, hasMore, isFetching, onLoadMore]);

  useEffect(() => {
    if (!isFetching) return;
    
    const loadMoreData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsFetching(false);
    };

    loadMoreData();
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isFetching };
};