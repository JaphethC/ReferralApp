import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  ClipboardList, 
  FileText, 
  UserCheck, 
  AlertCircle,
  ChevronRight 
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface ActionItem {
  id: string;
  type: 'referral' | 'consult' | 'approval' | 'review';
  patient: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

const mockActionItems: ActionItem[] = [
  {
    id: '1',
    type: 'referral',
    patient: 'Sarah Johnson',
    description: 'Cardiology referral pending review',
    priority: 'high',
    dueDate: '2025-11-09',
  },
  {
    id: '2',
    type: 'consult',
    patient: 'Michael Chen',
    description: 'Consult note needs sign-off',
    priority: 'high',
    dueDate: '2025-11-08',
  },
  {
    id: '3',
    type: 'referral',
    patient: 'Emily Rodriguez',
    description: 'Orthopedic specialist approval needed',
    priority: 'medium',
    dueDate: '2025-11-10',
  },
  {
    id: '4',
    type: 'approval',
    patient: 'David Kim',
    description: 'Lab results require review',
    priority: 'medium',
    dueDate: '2025-11-11',
  },
  {
    id: '5',
    type: 'review',
    patient: 'Jessica Martinez',
    description: 'Treatment plan review',
    priority: 'low',
    dueDate: '2025-11-12',
  },
];

const typeIcons = {
  referral: ClipboardList,
  consult: FileText,
  approval: UserCheck,
  review: AlertCircle,
};

const priorityColors = {
  high: 'destructive',
  medium: 'default',
  low: 'secondary',
} as const;

interface ActionQueueProps {
  onSelectPatient?: (patientName: string) => void;
}

export function ActionQueue({ onSelectPatient }: ActionQueueProps) {
  const [items] = React.useState<ActionItem[]>(mockActionItems);

  const stats = React.useMemo(() => {
    return {
      total: items.length,
      referrals: items.filter(i => i.type === 'referral').length,
      consults: items.filter(i => i.type === 'consult').length,
      high: items.filter(i => i.priority === 'high').length,
    };
  }, [items]);

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Action Queue</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {stats.total} pending tasks • {stats.high} high priority
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="gap-1">
              <ClipboardList className="h-3 w-3" />
              {stats.referrals} Referrals
            </Badge>
            <Badge variant="outline" className="gap-1">
              <FileText className="h-3 w-3" />
              {stats.consults} Consults
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const Icon = typeIcons[item.type];
              return (
                <TableRow key={item.id} className="cursor-pointer hover:bg-accent/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize text-sm">{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.patient}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                  <TableCell>
                    <Badge variant={priorityColors[item.priority]} className="capitalize">
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(item.dueDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onSelectPatient?.(item.patient)}
                    >
                      Review
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
