// Healthcare Portal Components
export { PortalLayout } from './PortalLayout';
export type { PortalRole } from './PortalLayout';

export { PageHeader } from './PageHeader';
export { DataCard } from './DataCard';
export { AppointmentCard } from './AppointmentCard';
export type { Appointment } from './AppointmentCard';

export { StatusBadge } from './StatusBadge';
export type { StatusType } from './StatusBadge';

export { QuickActions } from './QuickActions';
export { AppointmentChart } from './AppointmentChart';
export { ThemeToggle } from './ThemeToggle';

// Patient Portal Components
export { NextStepCard, CallToScheduleCard, ViewDetailsCard } from './NextStepCard';
export { CareJourneyTimeline } from './CareJourneyTimeline';
export type { JourneyEvent, JourneyEventStatus } from './CareJourneyTimeline';
export { CommunityResourcesCard } from './CommunityResourcesCard';
export { PatientCalendar } from './PatientCalendar';

// Physician Portal Components
export { ActionQueue } from './ActionQueue';
export { ReferralCreation } from './ReferralCreation';
export { PatientSnapshot } from './PatientSnapshot';

// Admin Portal Components
export { KPIHeader } from './KPIHeader';
export type { KPIData } from './KPIHeader';
export { LeakageDashboard } from './LeakageDashboard';
export { HighRiskLeaksTable } from './HighRiskLeaksTable';
export type { HighRiskLeak } from './HighRiskLeaksTable';
export { SystemManagementSidebar } from './SystemManagementSidebar';
