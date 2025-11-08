import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  User, 
  Calendar,
  Activity,
  Pill,
  AlertTriangle,
  ClipboardList,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface PatientSnapshotProps {
  patientName: string;
}

export function PatientSnapshot({ patientName }: PatientSnapshotProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Patient Health Snapshot */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Health Snapshot</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">{patientName}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Demographics */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Demographics
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Age:</span>
                <span className="ml-2 font-medium">42 years</span>
              </div>
              <div>
                <span className="text-muted-foreground">Sex:</span>
                <span className="ml-2 font-medium">Female</span>
              </div>
              <div>
                <span className="text-muted-foreground">DOB:</span>
                <span className="ml-2 font-medium">03/15/1983</span>
              </div>
              <div>
                <span className="text-muted-foreground">MRN:</span>
                <span className="ml-2 font-medium">MRN-847592</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Vital Signs */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              Recent Vitals
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-accent/50 rounded">
                <span className="text-muted-foreground">BP</span>
                <span className="font-medium">128/82</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-accent/50 rounded">
                <span className="text-muted-foreground">HR</span>
                <span className="font-medium">72 bpm</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-accent/50 rounded">
                <span className="text-muted-foreground">Temp</span>
                <span className="font-medium">98.6°F</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-accent/50 rounded">
                <span className="text-muted-foreground">SpO2</span>
                <span className="font-medium">98%</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Active Medications */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Pill className="h-4 w-4 text-muted-foreground" />
              Active Medications
            </h4>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm p-2 bg-accent/30 rounded">
                <span>Lisinopril 10mg</span>
                <span className="text-muted-foreground text-xs">Daily</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-accent/30 rounded">
                <span>Metformin 500mg</span>
                <span className="text-muted-foreground text-xs">2x Daily</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-accent/30 rounded">
                <span>Atorvastatin 20mg</span>
                <span className="text-muted-foreground text-xs">Nightly</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Allergies & Alerts */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Allergies & Alerts
            </h4>
            <div className="space-y-1.5">
              <Badge variant="destructive" className="w-full justify-start gap-2">
                <AlertTriangle className="h-3 w-3" />
                Penicillin - Severe reaction
              </Badge>
              <Badge variant="outline" className="w-full justify-start gap-2 border-yellow-500 text-yellow-700 dark:text-yellow-500">
                <AlertTriangle className="h-3 w-3" />
                Latex - Mild allergy
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Referrals */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <CardTitle>Active Referrals</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">Current and pending referrals</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Referral 1 */}
          <Card className="border">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">Cardiology Consultation</h4>
                    <StatusBadge status="scheduled" size="sm" />
                  </div>
                  <p className="text-sm text-muted-foreground">Dr. Robert Martinez</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Nov 12, 2025 at 2:00 PM</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                <span>Patient confirmed appointment</span>
              </div>
            </CardContent>
          </Card>

          {/* Referral 2 */}
          <Card className="border">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">Orthopedic Surgery</h4>
                    <StatusBadge status="pending" size="sm" />
                  </div>
                  <p className="text-sm text-muted-foreground">Dr. James Wilson</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Awaiting patient scheduling</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                <Calendar className="h-3.5 w-3.5" />
                <span>Referral sent on Nov 5, 2025</span>
              </div>
            </CardContent>
          </Card>

          {/* Referral 3 */}
          <Card className="border">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">Physical Therapy</h4>
                    <StatusBadge status="completed" size="sm" />
                  </div>
                  <p className="text-sm text-muted-foreground">Sports Medicine Institute</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Completed Oct 28, 2025</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                <span>12 sessions completed</span>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
