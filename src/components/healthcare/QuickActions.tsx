import React from 'react';
import { Card, CardContent } from '../ui/card';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'primary' | 'accent' | 'default';
}

interface QuickActionsProps {
  actions: QuickAction[];
  className?: string;
}

const variantStyles = {
  primary: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700',
  accent: 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700',
  default: 'bg-secondary text-foreground hover:bg-secondary/80',
};

export function QuickActions({ actions, className = '' }: QuickActionsProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${className}`}>
      {actions.map((action, index) => {
        const Icon = action.icon;
        const variant = action.variant || 'default';
        
        return (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-md transition-all overflow-hidden"
            onClick={action.onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                action.onClick();
              }
            }}
          >
            <CardContent className="p-0">
              <button
                className={`
                  w-full h-full p-4 flex flex-col items-center justify-center gap-3 
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  ${variantStyles[variant]}
                `}
              >
                <Icon className="h-8 w-8" aria-hidden="true" />
                <span className="text-sm font-medium text-center">{action.label}</span>
              </button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
