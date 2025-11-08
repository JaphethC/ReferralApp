import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { LucideIcon } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  gradient?: 'primary' | 'accent' | 'success' | 'purple' | 'none';
  className?: string;
}

const gradientStyles = {
  primary: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white',
  accent: 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white',
  success: 'bg-gradient-to-br from-emerald-500 to-green-600 text-white',
  purple: 'bg-gradient-to-br from-purple-500 to-violet-600 text-white',
  none: '',
};

export function DataCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  gradient = 'none',
  className = '' 
}: DataCardProps) {
  const isGradient = gradient !== 'none';
  
  return (
    <Card className={`${isGradient ? gradientStyles[gradient] : ''} ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${isGradient ? 'text-white/90' : 'text-muted-foreground'}`}>
          {title}
        </CardTitle>
        {Icon && (
          <div className={`p-2 rounded-lg ${isGradient ? 'bg-white/20' : 'bg-primary-light'}`}>
            <Icon className={`h-5 w-5 ${isGradient ? 'text-white' : 'text-primary'}`} aria-hidden="true" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p className={`text-2xl font-semibold ${isGradient ? 'text-white' : 'text-foreground'}`}>{value}</p>
          {(description || trend) && (
            <div className="flex items-center gap-2">
              {trend && (
                <span 
                  className={`text-sm font-medium ${
                    isGradient 
                      ? 'text-white/90' 
                      : trend.isPositive 
                        ? 'text-status-success' 
                        : 'text-status-error'
                  }`}
                >
                  {trend.value}
                </span>
              )}
              {description && (
                <CardDescription className={`text-sm ${isGradient ? 'text-white/80' : ''}`}>
                  {description}
                </CardDescription>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
