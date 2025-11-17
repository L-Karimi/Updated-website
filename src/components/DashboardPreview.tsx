/**
 * Dashboard Preview Component
 * --------------------------
 * Renders miniature, non-interactive previews of actual platform dashboards
 * for use in the marketing website. These previews show the real UI at a
 * reduced scale to give prospects a genuine look at the platform.
 */

import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  DollarSign, 
  Truck,
  Settings,
  Home,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Shield,
  Briefcase,
  Library,
  Activity,
  UserCheck,
  Award
} from 'lucide-react';

interface DashboardPreviewProps {
  persona: string;
  className?: string;
}

/**
 * Generates a realistic dashboard preview based on persona
 * This is a visual approximation of the real dashboards
 */
export function DashboardPreview({ persona, className = '' }: DashboardPreviewProps) {
  // Get persona-specific config
  const config = PERSONA_CONFIGS[persona] || PERSONA_CONFIGS.principal;

  return (
    <div 
      className={`relative w-full aspect-[16/10] bg-background rounded-lg overflow-hidden border border-border ${className}`}
      style={{ 
        fontSize: '8px',
        transform: 'scale(0.95)',
        transformOrigin: 'top left'
      }}
    >
      {/* App Shell Mock */}
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="h-[12%] border-b bg-card px-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-primary/20" />
            <div className="text-[9px] opacity-60">QXP LMS</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-muted" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-[15%] border-r bg-card p-1 flex flex-col gap-0.5">
            {config.sidebarItems.map((item, idx) => (
              <div 
                key={idx} 
                className={`h-4 rounded px-1 flex items-center gap-1 ${idx === 0 ? 'bg-primary/10' : 'hover:bg-muted'}`}
              >
                <div className={`w-2 h-2 ${idx === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {React.createElement(item.icon, { size: 8 })}
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 p-2 bg-muted/30 overflow-hidden">
            {/* Page Header */}
            <div className="mb-2">
              <div className="h-2 w-[30%] bg-foreground/80 rounded mb-1" />
              <div className="h-1.5 w-[50%] bg-muted-foreground/40 rounded" />
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {config.kpiCards.map((kpi, idx) => (
                <Card key={idx} className="p-1.5 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-1">
                    <div 
                      className="w-3 h-3 rounded flex items-center justify-center"
                      style={{ backgroundColor: kpi.color + '20', color: kpi.color }}
                    >
                      {React.createElement(kpi.icon, { size: 6 })}
                    </div>
                    <div className={`text-[7px] px-1 py-0.5 rounded ${kpi.trendUp ? 'bg-green-500/10 text-green-700' : 'bg-red-500/10 text-red-700'}`}>
                      {kpi.trendUp ? '↑' : '↓'} {kpi.trendValue}
                    </div>
                  </div>
                  <div className="text-[10px] font-semibold mb-0.5">{kpi.value}</div>
                  <div className="text-[7px] text-muted-foreground truncate">{kpi.label}</div>
                </Card>
              ))}
            </div>

            {/* Content Area with Tabs/Charts */}
            <div className="grid grid-cols-2 gap-1.5">
              {/* Chart Card */}
              <Card className="p-1.5">
                <div className="text-[8px] font-medium mb-1">{config.chartTitle}</div>
                <div className="h-12 flex items-end justify-between gap-0.5">
                  {[40, 65, 45, 80, 60, 85, 70].map((height, idx) => (
                    <div 
                      key={idx} 
                      className="flex-1 rounded-t transition-all"
                      style={{ 
                        height: `${height}%`,
                        backgroundColor: config.chartColor,
                        opacity: 0.6 + (idx * 0.05)
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-[6px] text-muted-foreground">
                  <span>Mon</span>
                  <span>Sun</span>
                </div>
              </Card>

              {/* List Card */}
              <Card className="p-1.5">
                <div className="text-[8px] font-medium mb-1">{config.listTitle}</div>
                <div className="space-y-1">
                  {config.listItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-0.5 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-1 flex-1 min-w-0">
                        <div 
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.statusColor }}
                        />
                        <div className="text-[7px] truncate">{item.text}</div>
                      </div>
                      <div className="text-[6px] text-muted-foreground ml-1 flex-shrink-0">{item.value}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-primary/0 hover:bg-primary/5 transition-colors pointer-events-none" />
    </div>
  );
}

// ============================================
// PERSONA CONFIGURATIONS
// ============================================

interface PersonaConfig {
  sidebarItems: Array<{ icon: any; label: string }>;
  kpiCards: Array<{
    icon: any;
    value: string;
    label: string;
    color: string;
    trendUp: boolean;
    trendValue: string;
  }>;
  chartTitle: string;
  chartColor: string;
  listTitle: string;
  listItems: Array<{
    text: string;
    value: string;
    statusColor: string;
  }>;
}

const PERSONA_CONFIGS: Record<string, PersonaConfig> = {
  principal: {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: Users, label: 'Students' },
      { icon: GraduationCap, label: 'Staff' },
      { icon: BookOpen, label: 'Academics' },
      { icon: DollarSign, label: 'Finance' },
      { icon: BarChart3, label: 'Reports' },
    ],
    kpiCards: [
      { icon: Users, value: '847', label: 'Total Students', color: '#0734ff', trendUp: true, trendValue: '2.3%' },
      { icon: UserCheck, value: '96.2%', label: 'Attendance', color: '#78c054', trendUp: true, trendValue: '1.2%' },
      { icon: GraduationCap, value: '98/102', label: 'Staff Present', color: '#0707a4', trendUp: false, trendValue: '0.5%' },
      { icon: DollarSign, value: 'KES 2.4M', label: 'Fees Collected', color: '#f2b91a', trendUp: true, trendValue: '12%' },
    ],
    chartTitle: 'Weekly Attendance Trend',
    chartColor: '#0734ff',
    listTitle: 'Pending Approvals',
    listItems: [
      { text: 'Fee Waiver - Mary Wanjiku', value: '2h', statusColor: '#f2b91a' },
      { text: 'Leave Request - John Kamau', value: '5h', statusColor: '#0707a4' },
      { text: 'Purchase Order - IT Dept', value: '1d', statusColor: '#f2b91a' },
      { text: 'Exam Results - Grade 6', value: '2d', statusColor: '#78c054' },
    ],
  },

  'deputy-principal': {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: BookOpen, label: 'Curriculum' },
      { icon: FileText, label: 'Assessments' },
      { icon: Users, label: 'Teachers' },
      { icon: Calendar, label: 'Timetable' },
      { icon: BarChart3, label: 'Analytics' },
    ],
    kpiCards: [
      { icon: BookOpen, value: '94%', label: 'Syllabus Coverage', color: '#0707a4', trendUp: true, trendValue: '3%' },
      { icon: FileText, value: '28', label: 'Assessments Due', color: '#078054', trendUp: false, trendValue: '12%' },
      { icon: Users, value: '87%', label: 'Teacher Quality', color: '#0734ff', trendUp: true, trendValue: '2%' },
      { icon: Activity, value: '3.8', label: 'Avg Performance', color: '#f2b91a', trendUp: true, trendValue: '0.3' },
    ],
    chartTitle: 'Assessment Completion Rate',
    chartColor: '#0707a4',
    listTitle: 'Recent Observations',
    listItems: [
      { text: 'Math - Mr. Omondi (Grade 7)', value: '4.5★', statusColor: '#78c054' },
      { text: 'Science - Ms. Adhiambo', value: '4.2★', statusColor: '#78c054' },
      { text: 'English - Mrs. Njeri', value: '3.8★', statusColor: '#f2b91a' },
      { text: 'Kiswahili - Mr. Mwangi', value: '4.7★', statusColor: '#78c054' },
    ],
  },

  'ict-manager': {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: Users, label: 'Users' },
      { icon: Shield, label: 'Roles' },
      { icon: Settings, label: 'Settings' },
      { icon: Activity, label: 'Audit Logs' },
      { icon: BarChart3, label: 'Reports' },
    ],
    kpiCards: [
      { icon: Users, value: '1,247', label: 'Total Users', color: '#0734ff', trendUp: true, trendValue: '24' },
      { icon: Shield, value: '18', label: 'Active Roles', color: '#0707a4', trendUp: false, trendValue: '0' },
      { icon: Activity, value: '99.8%', label: 'System Uptime', color: '#78c054', trendUp: true, trendValue: '0.1%' },
      { icon: Settings, value: '3', label: 'Integrations', color: '#079dff', trendUp: false, trendValue: '0' },
    ],
    chartTitle: 'User Activity (24h)',
    chartColor: '#0734ff',
    listTitle: 'Recent Admin Actions',
    listItems: [
      { text: 'User created: teacher@kianda.ac.ke', value: '10m', statusColor: '#78c054' },
      { text: 'Role updated: Bursar permissions', value: '1h', statusColor: '#0734ff' },
      { text: 'Backup completed: 2.4GB', value: '3h', statusColor: '#78c054' },
      { text: 'Failed login: 5 attempts', value: '5h', statusColor: '#ef4444' },
    ],
  },

  registrar: {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: Users, label: 'Admissions' },
      { icon: FileText, label: 'Records' },
      { icon: Calendar, label: 'Enrollment' },
      { icon: Shield, label: 'Compliance' },
      { icon: BarChart3, label: 'Reports' },
    ],
    kpiCards: [
      { icon: Users, value: '142', label: 'New Applications', color: '#079dff', trendUp: true, trendValue: '18%' },
      { icon: FileText, value: '89', label: 'Pending Documents', color: '#f2b91a', trendUp: false, trendValue: '7' },
      { icon: Calendar, value: '847', label: 'Enrolled Students', color: '#0734ff', trendUp: true, trendValue: '2.3%' },
      { icon: Shield, value: '100%', label: 'Record Compliance', color: '#78c054', trendUp: true, trendValue: '0%' },
    ],
    chartTitle: 'Monthly Applications',
    chartColor: '#079dff',
    listTitle: 'Recent Admissions',
    listItems: [
      { text: 'John Mwangi - Grade 7', value: 'Approved', statusColor: '#78c054' },
      { text: 'Sarah Akinyi - Grade 4', value: 'Review', statusColor: '#f2b91a' },
      { text: 'David Ochieng - Grade 1', value: 'Pending', statusColor: '#079dff' },
      { text: 'Grace Wambui - Grade 9', value: 'Approved', statusColor: '#78c054' },
    ],
  },

  bursar: {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: DollarSign, label: 'Fees' },
      { icon: FileText, label: 'Invoices' },
      { icon: BarChart3, label: 'Reports' },
      { icon: Users, label: 'Accounts' },
      { icon: Settings, label: 'Settings' },
    ],
    kpiCards: [
      { icon: DollarSign, value: 'KES 8.4M', label: 'Collected (Term)', color: '#78c054', trendUp: true, trendValue: '12%' },
      { icon: Users, value: 'KES 2.1M', label: 'Outstanding', color: '#ef4444', trendUp: false, trendValue: '8%' },
      { icon: FileText, value: '234', label: 'Invoices Sent', color: '#f2b91a', trendUp: true, trendValue: '5%' },
      { icon: Activity, value: '80%', label: 'Collection Rate', color: '#0734ff', trendUp: true, trendValue: '3%' },
    ],
    chartTitle: 'Daily Collections',
    chartColor: '#f2b91a',
    listTitle: 'Top Arrears',
    listItems: [
      { text: 'Mary Njeri - Grade 10', value: 'KES 42K', statusColor: '#ef4444' },
      { text: 'John Kamau - Grade 8', value: 'KES 38K', statusColor: '#ef4444' },
      { text: 'Grace Wanjiku - Grade 6', value: 'KES 28K', statusColor: '#f2b91a' },
      { text: 'David Omondi - Grade 4', value: 'KES 21K', statusColor: '#f2b91a' },
    ],
  },

  procurement: {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: FileText, label: 'Requisitions' },
      { icon: Briefcase, label: 'Vendors' },
      { icon: DollarSign, label: 'Budget' },
      { icon: Truck, label: 'Orders' },
      { icon: BarChart3, label: 'Analytics' },
    ],
    kpiCards: [
      { icon: FileText, value: '18', label: 'Pending Requests', color: '#f2b91a', trendUp: true, trendValue: '6' },
      { icon: DollarSign, value: 'KES 1.2M', label: 'Monthly Spend', color: '#0734ff', trendUp: false, trendValue: '5%' },
      { icon: Briefcase, value: '34', label: 'Active Vendors', color: '#079dff', trendUp: true, trendValue: '2' },
      { icon: Truck, value: '12', label: 'Orders in Transit', color: '#0707a4', trendUp: false, trendValue: '3' },
    ],
    chartTitle: 'Weekly Spending',
    chartColor: '#f2b91a',
    listTitle: 'Pending Approvals',
    listItems: [
      { text: 'Stationery - KES 45K', value: 'Review', statusColor: '#f2b91a' },
      { text: 'Lab Equipment - KES 120K', value: 'Pending', statusColor: '#079dff' },
      { text: 'Sports Gear - KES 32K', value: 'Approved', statusColor: '#78c054' },
      { text: 'IT Hardware - KES 85K', value: 'Review', statusColor: '#f2b91a' },
    ],
  },

  'hr-manager': {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: Users, label: 'Staff' },
      { icon: DollarSign, label: 'Payroll' },
      { icon: Calendar, label: 'Leave' },
      { icon: Activity, label: 'Performance' },
      { icon: BarChart3, label: 'Reports' },
    ],
    kpiCards: [
      { icon: Users, value: '102', label: 'Total Staff', color: '#0707a4', trendUp: true, trendValue: '2' },
      { icon: DollarSign, value: 'KES 4.2M', label: 'Monthly Payroll', color: '#f2b91a', trendUp: false, trendValue: '0%' },
      { icon: Calendar, value: '8', label: 'On Leave', color: '#079dff', trendUp: true, trendValue: '3' },
      { icon: Activity, value: '4.2', label: 'Avg Performance', color: '#78c054', trendUp: true, trendValue: '0.2' },
    ],
    chartTitle: 'Attendance Trend',
    chartColor: '#0707a4',
    listTitle: 'Leave Requests',
    listItems: [
      { text: 'John Kamau - 3 days sick', value: 'Pending', statusColor: '#f2b91a' },
      { text: 'Mary Wanjiku - 5 days annual', value: 'Approved', statusColor: '#78c054' },
      { text: 'David Omondi - 2 days personal', value: 'Review', statusColor: '#079dff' },
      { text: 'Grace Njeri - 7 days annual', value: 'Approved', statusColor: '#78c054' },
    ],
  },

  transport: {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: Truck, label: 'Fleet' },
      { icon: Calendar, label: 'Routes' },
      { icon: Users, label: 'Drivers' },
      { icon: Activity, label: 'Tracking' },
      { icon: BarChart3, label: 'Reports' },
    ],
    kpiCards: [
      { icon: Truck, value: '18', label: 'Active Vehicles', color: '#079dff', trendUp: false, trendValue: '0' },
      { icon: Activity, value: '96%', label: 'On-Time Rate', color: '#78c054', trendUp: true, trendValue: '2%' },
      { icon: Users, value: '412', label: 'Students Served', color: '#0734ff', trendUp: true, trendValue: '8' },
      { icon: Calendar, value: '24', label: 'Active Routes', color: '#0707a4', trendUp: false, trendValue: '0' },
    ],
    chartTitle: 'Daily Trip Completion',
    chartColor: '#079dff',
    listTitle: 'Live Fleet Status',
    listItems: [
      { text: 'Bus 01 - Route A Morning', value: 'On Time', statusColor: '#78c054' },
      { text: 'Bus 05 - Route C Morning', value: 'Delayed 5m', statusColor: '#f2b91a' },
      { text: 'Van 03 - Route B Morning', value: 'On Time', statusColor: '#78c054' },
      { text: 'Bus 08 - Route D Morning', value: 'On Time', statusColor: '#78c054' },
    ],
  },

  librarian: {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: Library, label: 'Catalog' },
      { icon: BookOpen, label: 'Loans' },
      { icon: Users, label: 'Members' },
      { icon: Activity, label: 'Analytics' },
      { icon: BarChart3, label: 'Reports' },
    ],
    kpiCards: [
      { icon: Library, value: '8,421', label: 'Total Books', color: '#079dff', trendUp: true, trendValue: '42' },
      { icon: BookOpen, value: '234', label: 'Active Loans', color: '#0734ff', trendUp: true, trendValue: '12' },
      { icon: Users, value: '28', label: 'Overdue Books', color: '#ef4444', trendUp: false, trendValue: '8' },
      { icon: Activity, value: '1,824', label: 'Monthly Checkouts', color: '#78c054', trendUp: true, trendValue: '15%' },
    ],
    chartTitle: 'Weekly Loan Activity',
    chartColor: '#079dff',
    listTitle: 'Popular Books',
    listItems: [
      { text: 'Things Fall Apart - 42 loans', value: 'In Stock', statusColor: '#78c054' },
      { text: 'River & Source - 38 loans', value: 'All Out', statusColor: '#ef4444' },
      { text: 'Weep Not Child - 34 loans', value: '2 left', statusColor: '#f2b91a' },
      { text: 'Petals of Blood - 29 loans', value: 'In Stock', statusColor: '#78c054' },
    ],
  },

  boarding: {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: Home, label: 'Houses' },
      { icon: Calendar, label: 'Exeats' },
      { icon: Users, label: 'Students' },
      { icon: Activity, label: 'Roll Call' },
      { icon: BarChart3, label: 'Reports' },
    ],
    kpiCards: [
      { icon: Home, value: '425', label: 'Boarders', color: '#0707a4', trendUp: true, trendValue: '3' },
      { icon: Activity, value: '98%', label: 'Occupancy', color: '#78c054', trendUp: false, trendValue: '1%' },
      { icon: Calendar, value: '12', label: 'Active Exeats', color: '#079dff', trendUp: true, trendValue: '4' },
      { icon: Users, value: '100%', label: 'Roll Call', color: '#78c054', trendUp: true, trendValue: '0%' },
    ],
    chartTitle: 'Weekly Exeat Requests',
    chartColor: '#0707a4',
    listTitle: 'Pending Exeats',
    listItems: [
      { text: 'Mary Wanjiku - Weekend', value: 'Pending', statusColor: '#f2b91a' },
      { text: 'John Kamau - Medical', value: 'Approved', statusColor: '#78c054' },
      { text: 'Grace Njeri - Weekend', value: 'Review', statusColor: '#079dff' },
      { text: 'David Omondi - Family', value: 'Approved', statusColor: '#78c054' },
    ],
  },

  'class-teacher': {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: Users, label: 'My Class' },
      { icon: Calendar, label: 'Attendance' },
      { icon: MessageSquare, label: 'Messages' },
      { icon: FileText, label: 'Reports' },
      { icon: Activity, label: 'Wellbeing' },
    ],
    kpiCards: [
      { icon: Users, value: '42', label: 'Class Size', color: '#78c054', trendUp: false, trendValue: '0' },
      { icon: Activity, value: '95.2%', label: 'Avg Attendance', color: '#78c054', trendUp: true, trendValue: '1.5%' },
      { icon: MessageSquare, value: '8', label: 'Unread Messages', color: '#079dff', trendUp: true, trendValue: '3' },
      { icon: FileText, value: '3.8', label: 'Avg Performance', color: '#0734ff', trendUp: true, trendValue: '0.2' },
    ],
    chartTitle: 'Weekly Class Attendance',
    chartColor: '#78c054',
    listTitle: 'Students Needing Attention',
    listItems: [
      { text: 'Mary Wanjiku - 3 absences', value: 'Contact', statusColor: '#f2b91a' },
      { text: 'John Kamau - Grade drop', value: 'Review', statusColor: '#ef4444' },
      { text: 'Grace Njeri - Excellent progress', value: 'Praise', statusColor: '#78c054' },
      { text: 'David Omondi - Late 4x', value: 'Monitor', statusColor: '#f2b91a' },
    ],
  },

  'subject-teacher': {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: BookOpen, label: 'Lessons' },
      { icon: FileText, label: 'Assignments' },
      { icon: BarChart3, label: 'Grades' },
      { icon: Library, label: 'Resources' },
      { icon: Calendar, label: 'Timetable' },
    ],
    kpiCards: [
      { icon: Users, value: '168', label: 'Total Students', color: '#0734ff', trendUp: true, trendValue: '0' },
      { icon: BookOpen, value: '87%', label: 'Syllabus Progress', color: '#78c054', trendUp: true, trendValue: '5%' },
      { icon: FileText, value: '24', label: 'Pending Grading', color: '#f2b91a', trendUp: false, trendValue: '8' },
      { icon: Activity, value: '3.6', label: 'Class Average', color: '#0707a4', trendUp: true, trendValue: '0.3' },
    ],
    chartTitle: 'Assessment Scores',
    chartColor: '#78c054',
    listTitle: 'Recent Submissions',
    listItems: [
      { text: 'Grade 7A - Math Quiz 42 submitted', value: '2h', statusColor: '#78c054' },
      { text: 'Grade 7B - Homework 38 submitted', value: '1d', statusColor: '#f2b91a' },
      { text: 'Grade 8A - Assignment 40 submitted', value: '2d', statusColor: '#78c054' },
      { text: 'Grade 8B - Quiz 35 submitted', value: '3d', statusColor: '#f2b91a' },
    ],
  },

  'eca-coach': {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: Activity, label: 'Teams' },
      { icon: Calendar, label: 'Schedule' },
      { icon: Users, label: 'Rosters' },
      { icon: Award, label: 'Achievements' },
      { icon: BarChart3, label: 'Reports' },
    ],
    kpiCards: [
      { icon: Users, value: '124', label: 'Team Members', color: '#079dff', trendUp: true, trendValue: '8' },
      { icon: Calendar, value: '8', label: 'Upcoming Events', color: '#0734ff', trendUp: false, trendValue: '2' },
      { icon: Activity, value: '92%', label: 'Attendance Rate', color: '#78c054', trendUp: true, trendValue: '3%' },
      { icon: Award, value: '15', label: 'Awards This Term', color: '#f2b91a', trendUp: true, trendValue: '7' },
    ],
    chartTitle: 'Weekly Participation',
    chartColor: '#079dff',
    listTitle: 'This Week\'s Events',
    listItems: [
      { text: 'Soccer - Inter-school Match', value: 'Sat 2pm', statusColor: '#078054' },
      { text: 'Basketball - Training', value: 'Wed 4pm', statusColor: '#079dff' },
      { text: 'Swimming - Gala', value: 'Fri 3pm', statusColor: '#0734ff' },
      { text: 'Drama - Rehearsal', value: 'Thu 5pm', statusColor: '#f2b91a' },
    ],
  },

  student: {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: BookOpen, label: 'Courses' },
      { icon: FileText, label: 'Assignments' },
      { icon: BarChart3, label: 'Grades' },
      { icon: Library, label: 'Library' },
      { icon: Calendar, label: 'Calendar' },
    ],
    kpiCards: [
      { icon: FileText, value: '5', label: 'Pending Tasks', color: '#f2b91a', trendUp: false, trendValue: '2' },
      { icon: Activity, value: '3.8', label: 'Current GPA', color: '#78c054', trendUp: true, trendValue: '0.2' },
      { icon: Calendar, value: '3', label: 'Upcoming Tests', color: '#0734ff', trendUp: true, trendValue: '1' },
      { icon: BookOpen, value: '8', label: 'Active Courses', color: '#0707a4', trendUp: false, trendValue: '0' },
    ],
    chartTitle: 'Grade Trends',
    chartColor: '#0734ff',
    listTitle: 'Due This Week',
    listItems: [
      { text: 'Math - Chapter 5 Problems', value: 'Due Wed', statusColor: '#f2b91a' },
      { text: 'Science - Lab Report', value: 'Due Thu', statusColor: '#ef4444' },
      { text: 'English - Essay Draft', value: 'Due Fri', statusColor: '#f2b91a' },
      { text: 'Kiswahili - Composition', value: 'Due Mon', statusColor: '#079dff' },
    ],
  },

  parent: {
    sidebarItems: [
      { icon: Home, label: 'Dashboard' },
      { icon: Users, label: 'My Children' },
      { icon: BarChart3, label: 'Progress' },
      { icon: DollarSign, label: 'Fees' },
      { icon: MessageSquare, label: 'Messages' },
      { icon: Calendar, label: 'Calendar' },
    ],
    kpiCards: [
      { icon: Activity, value: '96.2%', label: 'Attendance', color: '#78c054', trendUp: true, trendValue: '1.2%' },
      { icon: BarChart3, value: '3.7', label: 'Avg Grade', color: '#0734ff', trendUp: true, trendValue: '0.3' },
      { icon: DollarSign, value: 'KES 0', label: 'Outstanding', color: '#78c054', trendUp: true, trendValue: '0%' },
      { icon: MessageSquare, value: '2', label: 'New Messages', color: '#079dff', trendUp: true, trendValue: '1' },
    ],
    chartTitle: 'Performance Trend',
    chartColor: '#78c054',
    listTitle: 'Recent Activity',
    listItems: [
      { text: 'Math Test - 85% (Grade 7)', value: '2d ago', statusColor: '#78c054' },
      { text: 'Science Assignment submitted', value: '3d ago', statusColor: '#0734ff' },
      { text: 'Fee payment received KES 42K', value: '1w ago', statusColor: '#78c054' },
      { text: 'Parent-Teacher meeting scheduled', value: 'Oct 15', statusColor: '#079dff' },
    ],
  },
};
