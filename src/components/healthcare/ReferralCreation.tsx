import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  Stethoscope, 
  Calendar, 
  MapPin, 
  Star,
  Clock,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface Specialist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  distance: string;
  nextAvailable: string;
  phoneNumber: string;
  acceptingNew: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const mockSpecialists: Record<string, Specialist[]> = {
  cardiology: [
    {
      id: '1',
      name: 'Dr. Robert Martinez',
      specialty: 'Cardiology',
      rating: 4.9,
      location: 'Heart & Vascular Center',
      distance: '2.3 mi',
      nextAvailable: 'Nov 12, 2025',
      phoneNumber: '(555) 234-5678',
      acceptingNew: true,
    },
    {
      id: '2',
      name: 'Dr. Lisa Chen',
      specialty: 'Interventional Cardiology',
      rating: 4.8,
      location: 'University Medical Center',
      distance: '4.1 mi',
      nextAvailable: 'Nov 15, 2025',
      phoneNumber: '(555) 345-6789',
      acceptingNew: true,
    },
  ],
  orthopedics: [
    {
      id: '3',
      name: 'Dr. James Wilson',
      specialty: 'Orthopedic Surgery',
      rating: 4.9,
      location: 'Sports Medicine Institute',
      distance: '1.8 mi',
      nextAvailable: 'Nov 10, 2025',
      phoneNumber: '(555) 456-7890',
      acceptingNew: true,
    },
    {
      id: '4',
      name: 'Dr. Sarah Thompson',
      specialty: 'Joint Replacement',
      rating: 4.7,
      location: 'Orthopedic Associates',
      distance: '3.5 mi',
      nextAvailable: 'Nov 18, 2025',
      phoneNumber: '(555) 567-8901',
      acceptingNew: true,
    },
  ],
  dermatology: [
    {
      id: '5',
      name: 'Dr. Amanda Park',
      specialty: 'Dermatology',
      rating: 4.8,
      location: 'Skin Care Specialists',
      distance: '2.9 mi',
      nextAvailable: 'Nov 14, 2025',
      phoneNumber: '(555) 678-9012',
      acceptingNew: true,
    },
  ],
};

const mockTimeSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '9:30 AM', available: false },
  { time: '10:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '11:30 AM', available: true },
  { time: '1:00 PM', available: true },
  { time: '1:30 PM', available: true },
  { time: '2:00 PM', available: false },
  { time: '2:30 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '3:30 PM', available: true },
];

interface ReferralCreationProps {
  patientName: string;
}

export function ReferralCreation({ patientName }: ReferralCreationProps) {
  const [selectedSpecialty, setSelectedSpecialty] = React.useState<string>('');
  const [specialists, setSpecialists] = React.useState<Specialist[]>([]);
  const [selectedSpecialist, setSelectedSpecialist] = React.useState<Specialist | null>(null);
  const [letPatientSchedule, setLetPatientSchedule] = React.useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = React.useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<string>('');
  const [selectedDate, setSelectedDate] = React.useState<string>('');

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setSpecialists(mockSpecialists[specialty] || []);
    setSelectedSpecialist(null);
    setLetPatientSchedule(false);
  };

  const handleViewSchedule = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    setShowScheduleDialog(true);
    setSelectedDate(specialist.nextAvailable);
  };

  const handleScheduleAppointment = () => {
    if (selectedTimeSlot && selectedSpecialist) {
      toast.success(
        `Appointment scheduled with ${selectedSpecialist.name} on ${selectedDate} at ${selectedTimeSlot}`
      );
      setShowScheduleDialog(false);
      setSelectedTimeSlot('');
    }
  };

  const handleLetPatientSchedule = (specialist: Specialist, checked: boolean) => {
    setSelectedSpecialist(specialist);
    setLetPatientSchedule(checked);
    if (checked) {
      toast.success(`Referral created. ${patientName} can now schedule with ${specialist.name}.`);
    }
  };

  return (
    <>
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Create Referral</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Patient: <span className="font-medium text-foreground">{patientName}</span>
              </p>
            </div>
            <Badge variant="outline" className="gap-1">
              <Stethoscope className="h-3 w-3" />
              Specialist Referral
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Specialty Selection */}
          <div className="space-y-2">
            <Label htmlFor="specialty">Select Specialty</Label>
            <Select value={selectedSpecialty} onValueChange={handleSpecialtyChange}>
              <SelectTrigger id="specialty" className="h-12">
                <SelectValue placeholder="Choose field of practice..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="orthopedics">Orthopedics</SelectItem>
                <SelectItem value="dermatology">Dermatology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Specialists List */}
          {specialists.length > 0 && (
            <div className="space-y-3">
              <Separator />
              <div className="flex items-center justify-between">
                <Label>Available Specialists</Label>
                <span className="text-sm text-muted-foreground">
                  {specialists.length} providers found
                </span>
              </div>
              
              <div className="space-y-3">
                {specialists.map((specialist) => (
                  <Card key={specialist.id} className="border">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{specialist.name}</h4>
                              {specialist.acceptingNew && (
                                <Badge variant="secondary" className="text-[0.65rem] px-1.5 py-0">
                                  Accepting New Patients
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{specialist.specialty}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-accent px-2 py-1 rounded-md">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="text-sm font-medium">{specialist.rating}</span>
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <div>
                              <div className="font-medium text-foreground">{specialist.location}</div>
                              <div className="text-xs">{specialist.distance} away</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <div>
                              <div className="font-medium text-foreground">Next Available</div>
                              <div className="text-xs">{specialist.nextAvailable}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                            <Phone className="h-4 w-4" />
                            <span>{specialist.phoneNumber}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-2">
                          <Button 
                            className="flex-1 h-12 gap-2" 
                            variant="default"
                            onClick={() => handleViewSchedule(specialist)}
                          >
                            <Calendar className="h-4 w-4" />
                            View Schedule & Book
                          </Button>
                          <div className="flex items-center gap-2 px-3 border rounded-md h-12">
                            <Checkbox 
                              id={`patient-schedule-${specialist.id}`}
                              checked={selectedSpecialist?.id === specialist.id && letPatientSchedule}
                              onCheckedChange={(checked) => 
                                handleLetPatientSchedule(specialist, checked as boolean)
                              }
                            />
                            <Label 
                              htmlFor={`patient-schedule-${specialist.id}`}
                              className="text-sm cursor-pointer whitespace-nowrap"
                            >
                              Let patient schedule
                            </Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {selectedSpecialty && specialists.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Stethoscope className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No specialists available for this specialty</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Schedule with {selectedSpecialist?.name}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              {selectedSpecialist?.location} • {selectedDate}
            </p>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label className="mb-3 block">Select Time Slot</Label>
              <div className="grid grid-cols-4 gap-2">
                {mockTimeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTimeSlot === slot.time ? 'default' : 'outline'}
                    className="h-12"
                    disabled={!slot.available}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                  >
                    {slot.available && selectedTimeSlot === slot.time && (
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                    )}
                    {slot.time}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 h-12"
                onClick={() => setShowScheduleDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 h-12 gap-2" 
                disabled={!selectedTimeSlot}
                onClick={handleScheduleAppointment}
              >
                <Calendar className="h-4 w-4" />
                Confirm Appointment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
