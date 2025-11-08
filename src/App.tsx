import React, { useState } from 'react';
import { PortalLayout, PortalRole } from './components/healthcare/PortalLayout';
import { PageHeader } from './components/healthcare/PageHeader';
import { DataCard } from './components/healthcare/DataCard';
import { AppointmentCard, Appointment } from './components/healthcare/AppointmentCard';
import { QuickActions } from './components/healthcare/QuickActions';
import { AppointmentChart } from './components/healthcare/AppointmentChart';
import { NextStepCard } from './components/healthcare/NextStepCard';
import { CareJourneyTimeline, JourneyEvent } from './components/healthcare/CareJourneyTimeline';
import { CommunityResourcesCard } from './components/healthcare/CommunityResourcesCard';
import { PatientCalendar } from './components/healthcare/PatientCalendar';
import { ActionQueue } from './components/healthcare/ActionQueue';
import { ReferralCreation } from './components/healthcare/ReferralCreation';
import { PatientSnapshot } from './components/healthcare/PatientSnapshot';
import { KPIHeader, KPIData } from './components/healthcare/KPIHeader';
import { LeakageDashboard } from './components/healthcare/LeakageDashboard';
import { HighRiskLeaksTable, HighRiskLeak } from './components/healthcare/HighRiskLeaksTable';
import { SystemManagementSidebar } from './components/healthcare/SystemManagementSidebar';
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText,
  Activity,
  TrendingUp,
  Plus,
  CalendarPlus,
  MessageSquare,
  FileUp,
  Heart,
  Pill,
  Zap,
  Phone,
  CheckCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import userImage from 'figma:asset/6a93d4b572b259f34fe5a2d90168a6e66028cb7e.png';

// Mock data for patient care journey
const patientJourneyEvents: JourneyEvent[] = [
  {
    id: '1',
    title: 'Initial Diagnosis',
    date: 'October 15, 2025',
    location: 'Main Medical Center',
    status: 'completed',
    description: 'Met with Dr. Johnson for initial assessment',
    details: 'Comprehensive health evaluation completed. Test results reviewed and care plan discussed.',
  },
  {
    id: '2',
    title: 'Lab Work & Tests',
    date: 'October 22, 2025',
    location: 'Medical Center Lab',
    status: 'completed',
    description: 'Blood work and diagnostic imaging completed',
    details: 'All required laboratory tests and imaging studies have been completed. Results are available in your health records.',
  },
  {
    id: '3',
    title: 'Specialist Appointment',
    date: 'November 15, 2025',
    location: 'Cardiology Center, Room 302',
    status: 'current',
    description: 'Follow-up with Dr. Sarah Chen (Cardiologist)',
    details: 'This appointment will review your test results and discuss the next steps in your treatment plan. Please bring your medication list.',
    actionRequired: 'Call to confirm your appointment',
  },
  {
    id: '4',
    title: 'Treatment Plan Review',
    date: 'November 30, 2025',
    location: 'Main Medical Center',
    status: 'upcoming',
    description: 'Review treatment options with your care team',
    details: 'Your care team will discuss all available treatment options and help you make informed decisions about your care.',
  },
  {
    id: '5',
    title: 'Follow-up Visit',
    date: 'December 15, 2025',
    location: 'Main Medical Center',
    status: 'upcoming',
    description: 'Check progress and adjust plan as needed',
    details: 'Regular follow-up to monitor your progress and make any necessary adjustments to your care plan.',
  },
];

// Mock data for different portals
const mockAppointments: Record<PortalRole, Appointment[]> = {
  patient: [
    {
      id: '1',
      doctorName: 'Dr. Sarah Chen',
      specialty: 'Cardiology',
      date: 'Nov 15, 2025',
      time: '10:00 AM',
      location: 'Medical Center, Room 302',
      status: 'success',
      type: 'Follow-up',
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Roberts',
      specialty: 'General Practice',
      date: 'Nov 22, 2025',
      time: '2:30 PM',
      location: 'Clinic West, Room 105',
      status: 'pending',
      type: 'Consultation',
    },
  ],
  physician: [
    {
      id: '1',
      patientName: 'John Anderson',
      date: 'Nov 8, 2025',
      time: '9:00 AM',
      location: 'Room 302',
      status: 'success',
      type: 'Annual Physical',
    },
    {
      id: '2',
      patientName: 'Emily Watson',
      date: 'Nov 8, 2025',
      time: '10:30 AM',
      location: 'Room 302',
      status: 'warning',
      type: 'Follow-up',
    },
    {
      id: '3',
      patientName: 'David Kim',
      date: 'Nov 8, 2025',
      time: '2:00 PM',
      location: 'Room 302',
      status: 'pending',
      type: 'New Patient',
    },
  ],
  admin: [
    {
      id: '1',
      patientName: 'Sarah Miller',
      doctorName: 'Dr. James Wilson',
      date: 'Nov 8, 2025',
      time: '9:00 AM',
      location: 'Building A, Room 201',
      status: 'success',
      type: 'Surgery',
    },
    {
      id: '2',
      patientName: 'Robert Taylor',
      doctorName: 'Dr. Lisa Brown',
      date: 'Nov 8, 2025',
      time: '11:00 AM',
      location: 'Building B, Room 105',
      status: 'warning',
      type: 'Consultation',
    },
  ],
};

// Chart data for physician portal
const physicianChartData = [
  { name: 'Mon', patients: 12, completed: 10 },
  { name: 'Tue', patients: 15, completed: 14 },
  { name: 'Wed', patients: 10, completed: 9 },
  { name: 'Thu', patients: 18, completed: 16 },
  { name: 'Fri', patients: 14, completed: 13 },
  { name: 'Sat', patients: 8, completed: 8 },
  { name: 'Sun', patients: 5, completed: 5 },
];

// Chart data for admin portal
const adminAppointmentData = [
  { name: 'Jan', total: 420, completed: 385, cancelled: 35 },
  { name: 'Feb', total: 450, completed: 410, cancelled: 40 },
  { name: 'Mar', total: 480, completed: 445, cancelled: 35 },
  { name: 'Apr', total: 510, completed: 475, cancelled: 35 },
  { name: 'May', total: 530, completed: 495, cancelled: 35 },
  { name: 'Jun', total: 560, completed: 520, cancelled: 40 },
];

const adminUserGrowthData = [
  { name: 'Jan', patients: 850, physicians: 42 },
  { name: 'Feb', patients: 920, physicians: 44 },
  { name: 'Mar', patients: 1015, physicians: 46 },
  { name: 'Apr', patients: 1080, physicians: 47 },
  { name: 'May', patients: 1165, physicians: 48 },
  { name: 'Jun', patients: 1247, physicians: 48 },
];

function PatientDashboard() {
  return (
    <div className="space-y-8 md:space-y-12 max-w-4xl mx-auto">
      {/* Simple Welcome Header */}
      <div className="space-y-3 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl">Welcome back, Anthony</h1>
        <p className="text-xl text-muted-foreground">
          Here's what's happening with your care
        </p>
      </div>

      {/* Next Step - Hero Section */}
      <NextStepCard
        title="Confirm your specialist appointment"
        description="You have an appointment coming up with Dr. Sarah Chen (Cardiologist) on November 15. Confirm your appointment now, or call us if you need to reschedule."
        actionLabel="Confirm Appointment"
        actionIcon={CheckCircle}
        onAction={() => {
          toast.success('Appointment Confirmed!', {
            description: 'Your appointment with Dr. Sarah Chen on Nov 15 at 10:00 AM has been confirmed.',
          });
        }}
        urgency="important"
        dueDate="November 13, 2025"
        phoneNumber="(555) 123-4567"
      />

      {/* Care Journey Timeline */}
      <div className="py-4">
        <CareJourneyTimeline 
          events={patientJourneyEvents}
          onEventClick={(event) => console.log('Event clicked:', event)}
        />
      </div>

      {/* Community Resources */}
      <div className="py-4">
        <CommunityResourcesCard
          onSearchResources={() => console.log('Search resources')}
          onViewMap={() => console.log('View map')}
          onCategoryClick={(category) => console.log('Category clicked:', category)}
        />
      </div>

      {/* Quick Access - Simple Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl">Quick Access</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <button 
            onClick={() => console.log('View messages')}
            className="p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all text-left hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">Messages</h3>
                <p className="text-sm text-muted-foreground mb-2">Talk with your care team</p>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  3 new messages
                </span>
              </div>
            </div>
          </button>

          <button 
            onClick={() => console.log('View records')}
            className="p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-600 transition-all text-left hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-teal-100 dark:bg-teal-900/30">
                <FileText className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">My Health Records</h3>
                <p className="text-sm text-muted-foreground">View test results and documents</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function PhysicianDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<string>('Sarah Johnson');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Good morning, Dr. Chen"
        description="You have 5 pending tasks requiring your attention"
        action={{
          label: 'View Schedule',
          icon: Calendar,
          onClick: () => console.log('View schedule'),
          variant: 'primary',
        }}
      />

      {/* Action Queue - Priority 1 */}
      <ActionQueue onSelectPatient={(patient) => setSelectedPatient(patient)} />

      {/* Referral Creation - Priority 2 */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl">Create Referral</h2>
          <p className="text-muted-foreground">
            Quickly refer patients to specialists with minimal clicks
          </p>
        </div>
        <ReferralCreation patientName={selectedPatient} />
      </div>

      {/* Patient Snapshot - Priority 3 */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl">Patient Overview</h2>
          <p className="text-muted-foreground">
            Health snapshot and active referrals at a glance
          </p>
        </div>
        <PatientSnapshot patientName={selectedPatient} />
      </div>
    </div>
  );
}

function AdminDashboard() {
  // Mock KPI data
  const kpiData: KPIData = {
    totalReferrals: {
      value: 1847,
      trend: { value: '+12%', isPositive: true },
    },
    completionRate: {
      value: 73.5,
      trend: { value: '+5.2%', isPositive: true },
    },
    potentialLostRevenue: {
      value: 284500,
      trend: { value: '-8.3%', isPositive: true },
    },
  };

  // Mock service line data
  const serviceLineData = [
    { name: 'Cardiology', lostRevenue: 95000, color: '#EF4444' },
    { name: 'Orthopedics', lostRevenue: 78000, color: '#F97316' },
    { name: 'Neurology', lostRevenue: 52000, color: '#F59E0B' },
    { name: 'Gastro', lostRevenue: 34500, color: '#EAB308' },
    { name: 'Dermatology', lostRevenue: 25000, color: '#84CC16' },
  ];

  // Mock provider leakage data
  const providerLeakageData = [
    { name: 'Dr. Wilson', leakageRate: 32 },
    { name: 'Dr. Chen', leakageRate: 28 },
    { name: 'Dr. Martinez', leakageRate: 24 },
    { name: 'Dr. Johnson', leakageRate: 19 },
    { name: 'Dr. Thompson', leakageRate: 15 },
  ];

  // Mock high-risk leaks
  const highRiskLeaks: HighRiskLeak[] = [
    {
      referralId: 'REF-2847',
      patientName: 'Michael Anderson',
      provider: 'Dr. Wilson',
      serviceLine: 'Cardiology',
      status: 'lost',
      cause: 'Patient unable to reach specialist',
      estimatedValue: 8500,
      daysPending: 45,
    },
    {
      referralId: 'REF-2821',
      patientName: 'Sarah Martinez',
      provider: 'Dr. Chen',
      serviceLine: 'Orthopedics',
      status: 'delayed',
      cause: 'Insurance authorization pending',
      estimatedValue: 12000,
      daysPending: 38,
    },
    {
      referralId: 'REF-2798',
      patientName: 'David Kim',
      provider: 'Dr. Martinez',
      serviceLine: 'Neurology',
      status: 'no-show',
      cause: 'Patient missed appointment',
      estimatedValue: 6500,
      daysPending: 28,
    },
    {
      referralId: 'REF-2776',
      patientName: 'Emily Rodriguez',
      provider: 'Dr. Johnson',
      serviceLine: 'Gastro',
      status: 'pending',
      cause: 'Awaiting patient scheduling',
      estimatedValue: 4200,
      daysPending: 21,
    },
    {
      referralId: 'REF-2754',
      patientName: 'Robert Taylor',
      provider: 'Dr. Wilson',
      serviceLine: 'Cardiology',
      status: 'delayed',
      cause: 'Specialist unavailable',
      estimatedValue: 9800,
      daysPending: 33,
    },
    {
      referralId: 'REF-2732',
      patientName: 'Jessica Brown',
      provider: 'Dr. Thompson',
      serviceLine: 'Dermatology',
      status: 'pending',
      cause: 'Patient contact needed',
      estimatedValue: 3500,
      daysPending: 19,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue Dashboard"
        description="Track referral performance and identify revenue leakage"
        action={{
          label: 'Export Report',
          icon: FileText,
          onClick: () => {
            toast.success('Report exported successfully');
          },
          variant: 'primary',
        }}
      />

      {/* KPI Header */}
      <KPIHeader data={kpiData} />

      {/* Leakage Dashboard Charts */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl">Revenue Leakage Analysis</h2>
          <p className="text-muted-foreground">
            Identify and address revenue loss patterns
          </p>
        </div>
        <LeakageDashboard 
          serviceLineData={serviceLineData}
          providerLeakageData={providerLeakageData}
        />
      </div>

      {/* High-Risk Leaks Table */}
      <HighRiskLeaksTable 
        leaks={highRiskLeaks}
        onFollowUp={(referralId) => {
          toast.success(`Follow-up initiated for ${referralId}`);
        }}
      />
    </div>
  );
}

export default function App() {
  const [currentRole, setCurrentRole] = useState<PortalRole>('patient');
  const [currentPath, setCurrentPath] = useState('/dashboard');

  const userNames: Record<PortalRole, string> = {
    patient: 'Anthony Palmer',
    physician: 'Dr. Sarah Chen',
    admin: 'Admin User',
  };

  const userInitials: Record<PortalRole, string> = {
    patient: 'AP',
    physician: 'SC',
    admin: 'AU',
  };

  const notificationCounts: Record<PortalRole, number> = {
    patient: 3,
    physician: 5,
    admin: 12,
  };

  // Patient calendar dates
  const patientCalendarDates = [
    {
      date: new Date(2025, 10, 15), // November 15, 2025
      label: 'Dr. Chen - Cardiology',
      type: 'appointment' as const,
    },
    {
      date: new Date(2025, 10, 22), // November 22, 2025
      label: 'Dr. Roberts - Follow-up',
      type: 'follow-up' as const,
    },
    {
      date: new Date(2025, 10, 30), // November 30, 2025
      label: 'Treatment Plan Review',
      type: 'appointment' as const,
    },
  ];

  const renderDashboard = () => {
    switch (currentRole) {
      case 'patient':
        return <PatientDashboard />;
      case 'physician':
        return <PhysicianDashboard />;
      case 'admin':
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen">
      <Toaster />
      {/* Portal Selector - Only for demo purposes */}
      <div className="bg-muted border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Demo Portal Selector:
            </span>
            <Tabs value={currentRole} onValueChange={(value) => setCurrentRole(value as PortalRole)}>
              <TabsList>
                <TabsTrigger value="patient">Patient Portal</TabsTrigger>
                <TabsTrigger value="physician">Physician Portal</TabsTrigger>
                <TabsTrigger value="admin">Admin Portal</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <PortalLayout
        role={currentRole}
        userName={userNames[currentRole]}
        userInitials={userInitials[currentRole]}
        userImage={currentRole === 'patient' ? userImage : undefined}
        currentPath={currentPath}
        notificationCount={notificationCounts[currentRole]}
        onNavigate={(href) => {
          setCurrentPath(href);
          console.log('Navigate to:', href);
        }}
        onLogout={() => console.log('Logout')}
        sidebarContent={
          currentRole === 'patient' ? (
            <PatientCalendar upcomingDates={patientCalendarDates} />
          ) : currentRole === 'admin' ? (
            <SystemManagementSidebar onNavigate={(section) => {
              toast.success(`Navigating to ${section}`);
              console.log('Navigate to:', section);
            }} />
          ) : undefined
        }
      >
        {renderDashboard()}
      </PortalLayout>
    </div>
  );
}
