// Image lazy loading utility
export const createImageLoader = (src: string, options?: { 
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      options?.onLoad?.();
      resolve(img);
    };
    
    img.onerror = () => {
      options?.onError?.();
      reject(new Error(`Failed to load image: ${src}`));
    };
    
    img.src = src;
  });
};

// Debounce utility for search and form inputs
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle utility for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Format numbers for display (1000 -> 1k)
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};

// Optimize image URLs for different screen sizes
export const getOptimizedImageUrl = (url: string, width: number, quality = 80): string => {
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&q=${quality}&auto=format&fit=crop`;
  }
  return url;
};