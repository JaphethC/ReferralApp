import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { LucideIcon, ArrowRight, Phone, Calendar, ExternalLink } from 'lucide-react';

interface NextStepCardProps {
  title: string;
  description: string;
  actionLabel: string;
  actionIcon?: LucideIcon;
  onAction: () => void;
  urgency?: 'normal' | 'important';
  dueDate?: string;
  phoneNumber?: string;
}

export function NextStepCard({
  title,
  description,
  actionLabel,
  actionIcon: ActionIcon = ArrowRight,
  onAction,
  urgency = 'normal',
  dueDate,
  phoneNumber,
}: NextStepCardProps) {
  const isImportant = urgency === 'important';

  return (
    <Card 
      className={`
        border-2 transition-all
        ${isImportant 
          ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 dark:border-amber-600' 
          : 'border-primary bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 dark:border-primary'
        }
      `}
    >
      <CardContent className="p-8 md:p-10">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`
                w-3 h-3 rounded-full animate-pulse
                ${isImportant ? 'bg-amber-500' : 'bg-primary'}
              `} />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Your Next Step
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl leading-tight">
              {title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Due Date and Phone Number */}
          <div className="flex flex-col sm:flex-row gap-3 text-muted-foreground">
            {dueDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Due by: {dueDate}</span>
              </div>
            )}
            {phoneNumber && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">
                  Or call: <a href={`tel:${phoneNumber}`} className="font-medium text-foreground hover:underline">{phoneNumber}</a>
                </span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button 
              onClick={onAction}
              size="lg"
              className={`
                w-full sm:w-auto text-lg px-8 py-6 gap-3 shadow-lg hover:shadow-xl transition-all
                ${isImportant
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                }
              `}
            >
              <ActionIcon className="h-5 w-5" />
              {actionLabel}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Pre-configured variants for common actions
export function CallToScheduleCard(props: Omit<NextStepCardProps, 'actionIcon'>) {
  return <NextStepCard {...props} actionIcon={Phone} />;
}

export function ViewDetailsCard(props: Omit<NextStepCardProps, 'actionIcon'>) {
  return <NextStepCard {...props} actionIcon={ExternalLink} />;
}
