import React from 'react';
import { Calendar } from '../ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CalendarDays } from 'lucide-react';

interface CalendarDate {
  date: Date;
  label: string;
  type: 'appointment' | 'lab' | 'follow-up';
}

interface PatientCalendarProps {
  upcomingDates?: CalendarDate[];
}

export function PatientCalendar({ upcomingDates = [] }: PatientCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  
  // Create a map of dates for quick lookup
  const dateMap = React.useMemo(() => {
    const map = new Map<string, CalendarDate>();
    upcomingDates.forEach(item => {
      const dateKey = item.date.toISOString().split('T')[0];
      map.set(dateKey, item);
    });
    return map;
  }, [upcomingDates]);

  // Custom day renderer to highlight upcoming appointments
  const modifiers = {
    highlighted: upcomingDates.map(item => item.date),
  };

  const modifiersStyles = {
    highlighted: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      fontWeight: 'bold',
      borderRadius: '0.375rem',
    },
  };

  const modifiersClassNames = {
    highlighted: 'bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90',
  };

  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <CardTitle className="text-base">Your Calendar</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-4 px-3">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          className="rounded-md w-full"
          classNames={{
            months: "flex flex-col w-full",
            month: "space-y-3 w-full",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-xs font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-0",
            nav_button_next: "absolute right-0",
            table: "w-full border-collapse",
            head_row: "flex w-full",
            head_cell: "text-muted-foreground rounded-md flex-1 font-normal text-[0.65rem] flex justify-center items-center",
            row: "flex w-full mt-1",
            cell: "flex-1 text-center text-xs p-0 relative flex justify-center items-center",
            day: "h-7 w-7 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md text-xs",
            day_range_end: "day-range-end",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground font-semibold",
            day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
        
        {/* Legend */}
        <div className="mt-3 space-y-2 pt-3 border-t">
          <p className="text-xs font-medium text-muted-foreground mb-1.5">Upcoming Events</p>
          {upcomingDates.length > 0 ? (
            <div className="space-y-1.5">
              {upcomingDates.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-start gap-1.5 text-xs">
                  <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-muted-foreground text-[0.65rem]">
                      {item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="truncate text-[0.7rem]">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">No upcoming events</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
