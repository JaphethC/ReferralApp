import React from 'react';
import { Button } from '../ui/button';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
    variant?: 'default' | 'primary' | 'accent';
  };
  breadcrumbs?: Array<{ label: string; href?: string }>;
  className?: string;
}

export function PageHeader({ 
  title, 
  description, 
  action,
  breadcrumbs,
  className = '' 
}: PageHeaderProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {crumb.href ? (
                  <button 
                    className="hover:text-foreground transition-colors"
                    onClick={() => {/* Navigate to href */}}
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <h1>{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        
        {action && (
          <Button
            onClick={action.onClick}
            variant={action.variant === 'primary' ? 'default' : action.variant === 'accent' ? 'default' : 'outline'}
            className={
              action.variant === 'primary' 
                ? 'bg-primary hover:bg-primary-hover' 
                : action.variant === 'accent'
                ? 'bg-accent hover:bg-accent-hover text-accent-foreground'
                : ''
            }
          >
            {action.icon && <action.icon className="mr-2 h-4 w-4" aria-hidden="true" />}
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
