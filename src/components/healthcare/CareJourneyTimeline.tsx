import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Circle,
  ChevronRight,
  Calendar,
  MapPin,
  Info
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export type JourneyEventStatus = 'completed' | 'current' | 'upcoming' | 'needs-action';

export interface JourneyEvent {
  id: string;
  title: string;
  date: string;
  location?: string;
  status: JourneyEventStatus;
  description?: string;
  details?: string;
  actionRequired?: string;
}

interface CareJourneyTimelineProps {
  events: JourneyEvent[];
  onEventClick?: (event: JourneyEvent) => void;
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    borderColor: 'border-emerald-300 dark:border-emerald-700',
    label: 'Completed',
  },
  current: {
    icon: Clock,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    borderColor: 'border-blue-400 dark:border-blue-600',
    label: 'In Progress',
  },
  'needs-action': {
    icon: AlertCircle,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    borderColor: 'border-amber-400 dark:border-amber-600',
    label: 'Action Needed',
  },
  upcoming: {
    icon: Circle,
    color: 'text-slate-400 dark:text-slate-500',
    bgColor: 'bg-slate-50 dark:bg-slate-900/30',
    borderColor: 'border-slate-200 dark:border-slate-700',
    label: 'Upcoming',
  },
};

export function CareJourneyTimeline({ events, onEventClick }: CareJourneyTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<JourneyEvent | null>(null);

  const handleEventClick = (event: JourneyEvent) => {
    setSelectedEvent(event);
    onEventClick?.(event);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2 mb-6">
          <h2 className="text-2xl">Your Care Journey</h2>
          <p className="text-muted-foreground text-lg">
            Track your progress through each step of your care plan
          </p>
        </div>

        <div className="relative">
          {events.map((event, index) => {
            const config = statusConfig[event.status];
            const Icon = config.icon;
            const isCurrent = event.status === 'current';
            const isLast = index === events.length - 1;

            return (
              <div key={event.id} className="relative">
                {/* Timeline connector line */}
                {!isLast && (
                  <div className="absolute left-6 top-20 bottom-0 w-0.5 border-l-2 border-dashed border-slate-300 dark:border-slate-600" 
                       style={{ height: isCurrent ? '120px' : '60px' }}
                  />
                )}

                {/* Event Card */}
                <button
                  onClick={() => handleEventClick(event)}
                  className={`
                    w-full text-left mb-6 transition-all duration-200
                    ${isCurrent ? 'transform hover:scale-[1.02]' : 'hover:translate-x-1'}
                  `}
                >
                  <Card 
                    className={`
                      border-2 transition-all
                      ${isCurrent 
                        ? `${config.borderColor} shadow-lg` 
                        : `${config.borderColor} shadow-sm hover:shadow-md`
                      }
                      ${isCurrent ? 'min-h-[160px]' : 'min-h-[100px]'}
                    `}
                  >
                    <CardContent className={`${isCurrent ? 'p-6 md:p-8' : 'p-6'}`}>
                      <div className="flex items-start gap-4">
                        {/* Status Icon */}
                        <div className={`
                          flex-shrink-0 rounded-full p-3 ${config.bgColor}
                          ${isCurrent ? 'ring-4 ring-offset-2 ring-blue-200 dark:ring-blue-800' : ''}
                        `}>
                          <Icon className={`h-6 w-6 ${config.color}`} />
                        </div>

                        {/* Event Content */}
                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={`font-semibold ${isCurrent ? 'text-xl' : 'text-lg'}`}>
                                  {event.title}
                                </h3>
                                <span className={`
                                  inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                                  ${config.bgColor} ${config.color} border ${config.borderColor}
                                `}>
                                  <Icon className="h-3 w-3" />
                                  {config.label}
                                </span>
                              </div>
                              
                              {event.description && (
                                <p className={`text-muted-foreground ${isCurrent ? 'text-base' : 'text-sm'}`}>
                                  {event.description}
                                </p>
                              )}
                            </div>

                            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                          </div>

                          {/* Event Details */}
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Required Badge */}
                          {event.actionRequired && isCurrent && (
                            <div className="pt-2">
                              <div className="inline-flex items-center gap-2 px-3 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-lg border border-amber-300 dark:border-amber-700">
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-sm font-medium">{event.actionRequired}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-lg">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  {(() => {
                    const config = statusConfig[selectedEvent.status];
                    const Icon = config.icon;
                    return (
                      <div className={`rounded-full p-2 ${config.bgColor}`}>
                        <Icon className={`h-5 w-5 ${config.color}`} />
                      </div>
                    );
                  })()}
                  <span className={`
                    inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                    ${statusConfig[selectedEvent.status].bgColor} 
                    ${statusConfig[selectedEvent.status].color}
                    border ${statusConfig[selectedEvent.status].borderColor}
                  `}>
                    {(() => {
                      const Icon = statusConfig[selectedEvent.status].icon;
                      return <Icon className="h-3 w-3" />;
                    })()}
                    {statusConfig[selectedEvent.status].label}
                  </span>
                </div>
                <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
                {selectedEvent.description && (
                  <DialogDescription className="text-base pt-2">
                    {selectedEvent.description}
                  </DialogDescription>
                )}
              </DialogHeader>

              <div className="space-y-4 pt-4">
                {/* Date and Location */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{selectedEvent.date}</p>
                    </div>
                  </div>
                  
                  {selectedEvent.location && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{selectedEvent.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                {selectedEvent.details && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Details</p>
                        <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                          {selectedEvent.details}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Required */}
                {selectedEvent.actionRequired && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">Action Needed</p>
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          {selectedEvent.actionRequired}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
