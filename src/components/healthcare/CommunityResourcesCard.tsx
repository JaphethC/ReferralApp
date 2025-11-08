import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Map, Search, Heart, Home, Utensils, Bus, Phone } from 'lucide-react';

interface ResourceCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const resourceCategories: ResourceCategory[] = [
  {
    id: 'housing',
    label: 'Housing Help',
    icon: Home,
    description: 'Find housing assistance',
    color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
  },
  {
    id: 'food',
    label: 'Food Programs',
    icon: Utensils,
    description: 'Food banks and meal programs',
    color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30',
  },
  {
    id: 'transportation',
    label: 'Transportation',
    icon: Bus,
    description: 'Travel assistance',
    color: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30',
  },
  {
    id: 'support',
    label: 'Support Services',
    icon: Heart,
    description: 'Community support',
    color: 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30',
  },
];

interface CommunityResourcesCardProps {
  onSearchResources?: () => void;
  onViewMap?: () => void;
  onCategoryClick?: (categoryId: string) => void;
}

export function CommunityResourcesCard({ 
  onSearchResources, 
  onViewMap,
  onCategoryClick 
}: CommunityResourcesCardProps) {
  return (
    <Card className="border-2 border-purple-200 dark:border-purple-800">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
            <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-2xl">Community Support</CardTitle>
        </div>
        <CardDescription className="text-base">
          Access local resources and services that can help with your care journey
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick Categories */}
        <div className="grid grid-cols-2 gap-3">
          {resourceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryClick?.(category.id)}
                className="p-4 rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all hover:shadow-md text-left"
              >
                <div className="space-y-2">
                  <div className={`w-fit p-2 rounded-lg ${category.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{category.label}</p>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button 
            onClick={onSearchResources}
            className="flex-1 gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            size="lg"
          >
            <Search className="h-4 w-4" />
            Search Resources
          </Button>
          <Button 
            onClick={onViewMap}
            variant="outline"
            className="flex-1 gap-2 border-2"
            size="lg"
          >
            <Map className="h-4 w-4" />
            View Map
          </Button>
        </div>

        {/* Help Line */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Need Help Now?
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                Speak with a community resource specialist
              </p>
              <a 
                href="tel:1-800-555-0123" 
                className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Call 1-800-555-0123
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
