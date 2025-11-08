import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';

interface ServiceLineData {
  name: string;
  lostRevenue: number;
  color: string;
}

interface ProviderLeakageData {
  name: string;
  leakageRate: number;
}

interface LeakageDashboardProps {
  serviceLineData: ServiceLineData[];
  providerLeakageData: ProviderLeakageData[];
}

export function LeakageDashboard({ serviceLineData, providerLeakageData }: LeakageDashboardProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {/* Chart 1: Lost Revenue by Service Line */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg">Lost Revenue by Service Line</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Revenue leakage breakdown by department
          </p>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceLineData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                className="text-[10px] sm:text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                className="text-[10px] sm:text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                width={50}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Lost Revenue']}
              />
              <Bar dataKey="lostRevenue" radius={[8, 8, 0, 0]}>
                {serviceLineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chart 2: Leakage Rate by Referring Provider */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base sm:text-lg">Leakage Rate by Provider</CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Percentage of incomplete referrals by provider
          </p>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={providerLeakageData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                className="text-[10px] sm:text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                className="text-[10px] sm:text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `${value}%`}
                width={40}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: 'hsl(var(--popover-foreground))' }}
                formatter={(value: number) => [`${value}%`, 'Leakage Rate']}
              />
              <Bar 
                dataKey="leakageRate" 
                fill="#EF4444" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
