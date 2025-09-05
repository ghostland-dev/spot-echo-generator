import { Skeleton } from "@/components/ui/skeleton";

export const PostSkeleton = () => (
  <div className="bg-card rounded-lg shadow-sm border p-4 space-y-4">
    <div className="flex items-center space-x-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
    <Skeleton className="h-20 w-full" />
    <Skeleton className="h-48 w-full rounded-lg" />
    <div className="flex space-x-4">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-8 w-20" />
    </div>
  </div>
);

export const StorySkeleton = () => (
  <div className="flex space-x-4 p-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="flex flex-col items-center space-y-2">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-3 w-12" />
      </div>
    ))}
  </div>
);

export const SidebarSkeleton = () => (
  <div className="w-80 p-4 space-y-4">
    <div className="flex items-center space-x-3">
      <Skeleton className="h-9 w-9 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="flex items-center space-x-3">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-4 w-32" />
      </div>
    ))}
  </div>
);