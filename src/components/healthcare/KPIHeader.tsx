import React from 'react';
import { Card, CardContent } from '../ui/card';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ClipboardCheck,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../ui/utils';

interface KPICardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
    period?: string;
  };
  icon: React.ElementType;
  iconColor?: string;
  iconBg?: string;
}

function KPICard({ title, value, trend, icon: Icon, iconColor = 'text-primary', iconBg = 'bg-primary/10' }: KPICardProps) {
  return (
    <Card className="border-2 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn('p-3 rounded-lg', iconBg)}>
            <Icon className={cn('h-6 w-6', iconColor)} />
          </div>
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-md',
              trend.isPositive 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {trend?.period && (
            <p className="text-xs text-muted-foreground">{trend.period}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export interface KPIData {
  totalReferrals: {
    value: number;
    trend: { value: string; isPositive: boolean; };
  };
  completionRate: {
    value: number;
    trend: { value: string; isPositive: boolean; };
  };
  potentialLostRevenue: {
    value: number;
    trend: { value: string; isPositive: boolean; };
  };
}

interface KPIHeaderProps {
  data: KPIData;
}

export function KPIHeader({ data }: KPIHeaderProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <KPICard
        title="Total Referrals"
        value={data.totalReferrals.value.toLocaleString()}
        trend={{
          ...data.totalReferrals.trend,
          period: 'vs last month'
        }}
        icon={ClipboardCheck}
        iconColor="text-blue-600 dark:text-blue-400"
        iconBg="bg-blue-100 dark:bg-blue-900/30"
      />
      <KPICard
        title="Completion Rate"
        value={`${data.completionRate.value}%`}
        trend={{
          ...data.completionRate.trend,
          period: 'vs last month'
        }}
        icon={TrendingUp}
        iconColor="text-green-600 dark:text-green-400"
        iconBg="bg-green-100 dark:bg-green-900/30"
      />
      <KPICard
        title="Potential Lost Revenue"
        value={`$${data.potentialLostRevenue.value.toLocaleString()}`}
        trend={{
          ...data.potentialLostRevenue.trend,
          period: 'vs last month'
        }}
        icon={DollarSign}
        iconColor="text-red-600 dark:text-red-400"
        iconBg="bg-red-100 dark:bg-red-900/30"
      />
    </div>
  );
}
