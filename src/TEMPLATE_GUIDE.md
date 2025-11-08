# Healthcare Portal Base Template

A comprehensive, WCAG 2.1 AA compliant base template for building Patient, Physician, and Admin healthcare portals.

## Design System

### Color Palette

#### Primary Colors (Trustworthy Blue)
- **Primary**: `#0066CC` - Main brand color, used for primary actions and navigation
- **Primary Hover**: `#0052A3` - Hover state for primary elements
- **Primary Light**: `#E6F2FF` - Light background for primary contexts

#### Accent Colors (Vibrant Green)
- **Accent**: `#00A86B` - For CTAs and positive actions
- **Accent Hover**: `#008C59` - Hover state for accent elements
- **Accent Light**: `#E6F9F3` - Light background for accent contexts

#### Status Colors (WCAG AA Compliant)
- **Success**: `#10B981` (Green) - Completed, confirmed states
- **Warning**: `#F59E0B` (Orange) - Attention needed, caution
- **Error**: `#EF4444` (Red) - Errors, cancellations, critical alerts
- **Pending**: `#6B7280` (Gray) - Pending, in-progress states
- **Info**: `#3B82F6` (Blue) - Informational messages

Each status color includes:
- Base color for badges/icons
- Foreground color for text (ensures contrast)
- Light variant for backgrounds

#### Neutral Palette
- **Background**: `#FAFBFC` - Main app background
- **Foreground**: `#1A2332` - Primary text color
- **Card**: `#FFFFFF` - Card backgrounds
- **Border**: `#E5E7EB` - Borders and dividers
- **Muted**: `#F9FAFB` - Muted backgrounds
- **Muted Foreground**: `#6B7280` - Secondary text

### Typography

Uses system default sans-serif font with the following hierarchy:

- **H1**: 2xl, medium weight (for page titles)
- **H2**: xl, medium weight (for section headers)
- **H3**: lg, medium weight (for subsection headers)
- **H4**: base, medium weight (for card titles)
- **Body**: base, normal weight
- **Label**: base, medium weight

All typography follows WCAG 2.1 AA contrast requirements.

### Components

#### Spacing & Touch Targets
- Minimum button size: 48x48px (meets WCAG touch target requirements)
- Border radius: 0.5rem (8px) for consistent rounded corners
- Card padding: Standard 16-24px

#### Focus States
All interactive elements include visible focus indicators:
- 2px ring in primary color
- 2px offset for clarity
- High contrast for visibility

## Available Components

### Core Layout Components

#### `PortalLayout`
Main layout wrapper that provides:
- Responsive sidebar navigation (desktop) / sheet menu (mobile)
- Header with role-specific branding
- User profile dropdown
- Notification indicator
- Role-based navigation items

**Props:**
```typescript
{
  role: 'patient' | 'physician' | 'admin';
  userName: string;
  userInitials: string;
  children: React.ReactNode;
  currentPath?: string;
  notificationCount?: number;
  onNavigate?: (href: string) => void;
  onLogout?: () => void;
}
```

#### `PageHeader`
Consistent page header with optional breadcrumbs and actions.

**Props:**
```typescript
{
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
    variant?: 'default' | 'primary' | 'accent';
  };
  breadcrumbs?: Array<{ label: string; href?: string }>;
}
```

### Data Display Components

#### `DataCard`
Display key metrics and statistics.

**Props:**
```typescript
{
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}
```

#### `AppointmentCard`
Reusable card for displaying appointments with role-specific information.

**Props:**
```typescript
{
  appointment: Appointment;
  userRole?: 'patient' | 'physician' | 'admin';
  onAction?: (appointmentId: string, action: 'view' | 'reschedule' | 'cancel') => void;
}
```

#### `StatusBadge`
Color-coded status indicators.

**Types:** `'success' | 'warning' | 'error' | 'pending' | 'info'`

#### `QuickActions`
Grid of quick action buttons with icons.

**Props:**
```typescript
{
  actions: Array<{
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    variant?: 'primary' | 'accent' | 'default';
  }>;
}
```

## Accessibility Features

### WCAG 2.1 AA Compliance
✅ Color contrast ratios meet or exceed 4.5:1 for normal text  
✅ Touch targets are minimum 48x48px  
✅ Keyboard navigation fully supported  
✅ Focus indicators visible on all interactive elements  
✅ Semantic HTML with proper heading hierarchy  
✅ ARIA labels for screen readers  
✅ Alt text requirements for images  

### Responsive Design
- **Mobile-first approach** for Patient Portal
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Sidebar converts to sheet menu on mobile
- Grid layouts adjust for screen size
- Touch-friendly spacing on mobile

### Keyboard Navigation
- Tab order follows logical flow
- Enter/Space activate buttons and links
- Escape closes modals and dropdowns
- Arrow keys navigate menus

## Usage Examples

### Patient Portal Dashboard
```tsx
import { PortalLayout, PageHeader, DataCard, AppointmentCard } from './components/healthcare';

function PatientDashboard() {
  return (
    <PortalLayout
      role="patient"
      userName="John Doe"
      userInitials="JD"
      notificationCount={3}
    >
      <PageHeader
        title="Welcome back, John"
        description="Your health overview"
      />
      {/* Dashboard content */}
    </PortalLayout>
  );
}
```

### Physician Portal Dashboard
```tsx
function PhysicianDashboard() {
  return (
    <PortalLayout
      role="physician"
      userName="Dr. Smith"
      userInitials="DS"
      notificationCount={5}
    >
      <PageHeader
        title="Good morning, Dr. Smith"
        description="Today's schedule"
        action={{
          label: 'Add Note',
          icon: Plus,
          onClick: handleAddNote,
          variant: 'primary'
        }}
      />
      {/* Dashboard content */}
    </PortalLayout>
  );
}
```

### Admin Portal Dashboard
```tsx
function AdminDashboard() {
  return (
    <PortalLayout
      role="admin"
      userName="Admin"
      userInitials="AD"
      notificationCount={12}
    >
      <PageHeader
        title="System Overview"
        description="Healthcare portal administration"
      />
      {/* Dashboard content */}
    </PortalLayout>
  );
}
```

## Customization

### Adding New Status Types
To add custom status colors, update `/styles/globals.css`:

```css
:root {
  --status-custom: #YOUR_COLOR;
  --status-custom-foreground: #TEXT_COLOR;
  --status-custom-light: #LIGHT_BG;
}
```

Then add to the theme inline section:
```css
--color-status-custom: var(--status-custom);
```

### Extending Navigation
To add role-specific navigation items, modify the `navigationByRole` object in `PortalLayout.tsx`.

### Custom Quick Actions
Create role-specific quick actions using the `QuickActions` component with custom icons from `lucide-react`.

## Best Practices

1. **Always use semantic HTML** - Use proper heading levels, navigation landmarks, and form labels
2. **Test keyboard navigation** - Ensure all functionality is accessible via keyboard
3. **Maintain color contrast** - Use the provided color tokens that meet WCAG standards
4. **Mobile-first for patients** - Patient portal should prioritize mobile experience
5. **Consistent component usage** - Use the provided components for a unified look
6. **Status colors** - Use appropriate status colors to convey meaning clearly
7. **Loading states** - Implement loading skeletons for better perceived performance
8. **Error handling** - Provide clear, actionable error messages

## File Structure

```
/components/healthcare/
├── PortalLayout.tsx       # Main layout wrapper
├── PageHeader.tsx         # Page header component
├── DataCard.tsx          # Metric display card
├── AppointmentCard.tsx   # Appointment display card
├── StatusBadge.tsx       # Status indicator
├── QuickActions.tsx      # Quick action grid
└── index.tsx            # Export barrel

/components/ui/          # Shadcn UI components
/styles/globals.css      # Design system tokens
```

## Future Enhancements

Consider adding:
- Dark mode support
- Internationalization (i18n)
- Real-time notifications
- Print stylesheets
- Advanced data visualization
- File upload components
- Video consultation interface
- Prescription management UI
- Lab results viewer

## Support

For questions or issues with the template, refer to:
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Shadcn UI Docs: https://ui.shadcn.com/
- Tailwind CSS Docs: https://tailwindcss.com/docs
