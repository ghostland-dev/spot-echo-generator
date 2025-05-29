
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter, Users, Heart, MessageCircle, Mail, AtSign, Circle } from 'lucide-react';

interface NotificationFilterProps {
  currentFilter: string;
  onFilterChange: (filter: 'all' | 'unread' | 'friend_request' | 'like' | 'comment' | 'message' | 'mention') => void;
  counts: {
    all: number;
    unread: number;
    friend_request: number;
    like: number;
    comment: number;
    message: number;
    mention: number;
  };
}

export const NotificationFilter = ({ currentFilter, onFilterChange, counts }: NotificationFilterProps) => {
  const filterOptions = [
    { value: 'all', label: 'Toutes', icon: Circle, count: counts.all },
    { value: 'unread', label: 'Non lues', icon: Circle, count: counts.unread },
    { value: 'friend_request', label: 'Demandes d\'ami', icon: Users, count: counts.friend_request },
    { value: 'like', label: 'J\'aime', icon: Heart, count: counts.like },
    { value: 'comment', label: 'Commentaires', icon: MessageCircle, count: counts.comment },
    { value: 'message', label: 'Messages', icon: Mail, count: counts.message },
    { value: 'mention', label: 'Mentions', icon: AtSign, count: counts.mention },
  ];

  const currentFilterLabel = filterOptions.find(option => option.value === currentFilter)?.label || 'Toutes';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="text-gray-600">
          <Filter className="h-4 w-4 mr-2" />
          {currentFilterLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {filterOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onFilterChange(option.value as any)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center">
                <IconComponent className="h-4 w-4 mr-2" />
                {option.label}
              </div>
              {option.count > 0 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {option.count}
                </span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
