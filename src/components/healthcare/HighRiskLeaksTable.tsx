import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { 
  AlertTriangle, 
  ChevronRight,
  DollarSign,
  Filter
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export interface HighRiskLeak {
  referralId: string;
  patientName: string;
  provider: string;
  serviceLine: string;
  status: 'pending' | 'delayed' | 'no-show' | 'lost';
  cause: string;
  estimatedValue: number;
  daysPending: number;
}

interface HighRiskLeaksTableProps {
  leaks: HighRiskLeak[];
  onFollowUp?: (referralId: string) => void;
}

const statusColors = {
  pending: 'default',
  delayed: 'secondary',
  'no-show': 'outline',
  lost: 'destructive',
} as const;

const statusLabels = {
  pending: 'Pending',
  delayed: 'Delayed',
  'no-show': 'No-Show',
  lost: 'Lost',
};

export function HighRiskLeaksTable({ leaks, onFollowUp }: HighRiskLeaksTableProps) {
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [serviceFilter, setServiceFilter] = React.useState<string>('all');

  const filteredLeaks = React.useMemo(() => {
    return leaks.filter(leak => {
      const statusMatch = statusFilter === 'all' || leak.status === statusFilter;
      const serviceMatch = serviceFilter === 'all' || leak.serviceLine === serviceFilter;
      return statusMatch && serviceMatch;
    });
  }, [leaks, statusFilter, serviceFilter]);

  const totalValue = React.useMemo(() => {
    return filteredLeaks.reduce((sum, leak) => sum + leak.estimatedValue, 0);
  }, [filteredLeaks]);

  const serviceLines = React.useMemo(() => {
    return Array.from(new Set(leaks.map(leak => leak.serviceLine)));
  }, [leaks]);

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive flex-shrink-0" />
              <span className="line-clamp-1">High-Risk Leaks</span>
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {filteredLeaks.length} referrals • ${(totalValue / 1000).toFixed(0)}k at risk
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px] sm:w-[140px] h-10 text-xs sm:text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="no-show">No-Show</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-[120px] sm:w-[140px] h-10 text-xs sm:text-sm">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {serviceLines.map(service => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">Referral ID</TableHead>
                <TableHead className="min-w-[120px]">Patient</TableHead>
                <TableHead className="min-w-[100px]">Provider</TableHead>
                <TableHead className="min-w-[100px]">Service</TableHead>
                <TableHead className="min-w-[80px]">Status</TableHead>
                <TableHead className="min-w-[140px]">Cause</TableHead>
                <TableHead className="min-w-[80px]">Days</TableHead>
                <TableHead className="text-right min-w-[90px]">Value</TableHead>
                <TableHead className="text-right min-w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeaks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground text-sm">
                    No high-risk leaks found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeaks.map((leak) => (
                  <TableRow key={leak.referralId} className="hover:bg-accent/50">
                    <TableCell className="font-mono text-xs sm:text-sm">{leak.referralId}</TableCell>
                    <TableCell className="font-medium text-xs sm:text-sm">{leak.patientName}</TableCell>
                    <TableCell className="text-xs sm:text-sm text-muted-foreground">{leak.provider}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] sm:text-xs whitespace-nowrap">
                        {leak.serviceLine}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[leak.status]} className="capitalize text-[10px] sm:text-xs whitespace-nowrap">
                        {statusLabels[leak.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{leak.cause}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        <span className={`text-xs sm:text-sm ${leak.daysPending > 30 ? 'text-destructive font-medium' : ''}`}>
                          {leak.daysPending}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-xs sm:text-sm">
                      <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                        <DollarSign className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground" />
                        {(leak.estimatedValue / 1000).toFixed(1)}k
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => onFollowUp?.(leak.referralId)}
                      >
                        Follow
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
