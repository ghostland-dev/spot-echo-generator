// Analytics and performance monitoring utilities

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
  // Track user interactions for analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', { action, category, label, value });
  }
};

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  const startTime = performance.now();
  fn();
  const endTime = performance.now();
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance: ${name} took ${endTime - startTime} milliseconds`);
  }

  // Track performance metrics
  trackEvent({
    action: 'timing',
    category: 'Performance',
    label: name,
    value: Math.round(endTime - startTime),
  });
};

// Error tracking
export const trackError = (error: Error, context?: string) => {
  console.error('Error tracked:', error, context);
  
  trackEvent({
    action: 'exception',
    category: 'Error',
    label: `${error.name}: ${error.message}${context ? ` (${context})` : ''}`,
  });
};

// Page view tracking
export const trackPageView = (path: string, title: string) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: title,
    });
  }

  trackEvent({
    action: 'page_view',
    category: 'Navigation',
    label: path,
  });
};