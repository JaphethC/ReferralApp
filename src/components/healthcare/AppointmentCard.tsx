import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { StatusBadge, StatusType } from './StatusBadge';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Button } from '../ui/button';

export interface Appointment {
  id: string;
  patientName?: string;
  doctorName?: string;
  specialty?: string;
  date: string;
  time: string;
  location: string;
  status: StatusType;
  type: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  userRole?: 'patient' | 'physician' | 'admin';
  onAction?: (appointmentId: string, action: 'view' | 'reschedule' | 'cancel') => void;
  className?: string;
}

export function AppointmentCard({ 
  appointment, 
  userRole = 'patient',
  onAction,
  className = '' 
}: AppointmentCardProps) {
  const displayName = userRole === 'patient' 
    ? appointment.doctorName 
    : appointment.patientName;

  return (
    <Card className={`${className} hover:shadow-md transition-shadow`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <h3 className="font-medium">{displayName}</h3>
            </div>
            {appointment.specialty && (
              <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
            )}
          </div>
          <StatusBadge status={appointment.status}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </StatusBadge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span>{appointment.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span>{appointment.time}</span>
            </div>
          </div>
          
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden="true" />
            <span className="flex-1">{appointment.location}</span>
          </div>

          <div className="text-sm">
            <span className="inline-block px-2 py-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-primary border border-primary/20 rounded">
              {appointment.type}
            </span>
          </div>

          {onAction && (
            <div className="flex gap-2 pt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAction(appointment.id, 'view')}
                className="flex-1"
              >
                View Details
              </Button>
              {appointment.status !== 'error' && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onAction(appointment.id, 'reschedule')}
                >
                  Reschedule
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
