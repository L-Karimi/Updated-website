/*
 QXP Marketing Website — Enhanced Implementation
 -----------------------------------------------
 - Clean, minimal Ed-Tech design for Kenyan market
 - Hash-based routing with smooth animations
 - 13 pages total (7 personas, pricing, contact, demo, about, FAQ, testimonials, legal)
 - Enhanced forms with validation & persistence
 - Advanced pricing calculator with volume discounts
 - Motion animations for smooth UX
 - CRM integration ready
 - WCAG 2.2 AA compliant
 - Fully responsive
*/

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { motion } from "motion/react";
import { DashboardPreview } from "../components/DashboardPreview";
import {
  CheckCircle2,
  Users,
  GraduationCap,
  Building2,
  MessageSquare,
  Shield,
  Zap,
  // Globe,
  // Award,
  TrendingUp,
  // Clock,
  DollarSign,
  Star,
  Quote,
  ArrowRight,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Send,
  BookOpen,
  FileText,
  HelpCircle,
  Briefcase,
  // BarChart3,
  // CheckSquare,
  // Smartphone,
} from "lucide-react";

import logoHorizontal from "../assests/d30f90627223d61d5aded172077c692976a7bc43.png";

// -----------------------------
// Config & Data
// -----------------------------
const PRICE_PER_TERM = 999; // KES per user per term
const CURRENCIES = { KES: "KES" };
const DEFAULT_CURRENCY = "KES";

// Volume discount tiers
const DISCOUNT_TIERS = [
  { minUsers: 0, maxUsers: 99, discount: 0, label: "Small school" },
  { minUsers: 100, maxUsers: 499, discount: 5, label: "Medium school" },
  { minUsers: 500, maxUsers: 999, discount: 10, label: "Large school" },
  { minUsers: 1000, maxUsers: 4999, discount: 15, label: "School group" },
  { minUsers: 5000, maxUsers: Infinity, discount: 20, label: "Enterprise" },
];

const PERSONAS = [
  {
    slug: "principal",
    title: "Principal / Head Teacher",
    subtitle: "Full school oversight",
    oneLiner:
      "Run your entire school from one dashboard. Track everything that matters.",
    pains: ["Scattered reports", "Manual timetables", "Late submissions"],
    stats: ["1-click reports", "Complete oversight"],
    colorAccent: "#070745", // Navy Dark - Primary leadership
    colorBg: "rgba(7, 7, 69, 0.05)",
    colorBorder: "rgba(7, 7, 69, 0.2)",
    features: [
      "Curriculum planning",
      "Assessment tracking",
      "Staff management",
      "Parent communication",
      "Attendance oversight",
      "Automated reports",
    ],
  },
  {
    slug: "deputy-principal",
    title: "Deputy Principal",
    subtitle: "Academic programs",
    oneLiner: "Focus on academics. Monitor teaching quality. Drive results.",
    pains: ["Assessment chaos", "Curriculum gaps", "Teacher coordination"],
    stats: ["Academic oversight", "Quality assurance"],
    colorAccent: "#0707a4", // Royal Blue - Academic leadership
    colorBg: "rgba(7, 7, 164, 0.05)",
    colorBorder: "rgba(7, 7, 164, 0.2)",
    features: [
      "Curriculum monitoring",
      "Teacher observations",
      "Assessment analysis",
      "Timetable management",
      "Academic reporting",
      "Standards tracking",
    ],
  },
  {
    slug: "ict-manager",
    title: "ICT Manager",
    subtitle: "System administration",
    oneLiner:
      "Control access, data, and integrations. Keep everything running.",
    pains: ["User sprawl", "Permissions chaos", "Integration issues"],
    stats: ["Role-based access", "Audit-ready"],
    colorAccent: "#0734ff", // Bright Blue - Technology
    colorBg: "rgba(7, 52, 255, 0.05)",
    colorBorder: "rgba(7, 52, 255, 0.2)",
    features: [
      "User management",
      "Role permissions",
      "System configuration",
      "Data exports",
      "Audit logs",
      "Integration setup",
    ],
  },
  {
    slug: "registrar",
    title: "Registrar",
    subtitle: "Admissions & enrollment",
    oneLiner: "Streamline admissions. Manage records. Track enrollment.",
    pains: ["Paper applications", "Manual tracking", "Lost documents"],
    stats: ["Digital admissions", "Paperless records"],
    colorAccent: "#079dff", // Sky Blue - Support
    colorBg: "rgba(7, 157, 255, 0.05)",
    colorBorder: "rgba(7, 157, 255, 0.2)",
    features: [
      "Online applications",
      "Document management",
      "Enrollment tracking",
      "Student records",
      "Registration workflows",
      "Compliance reports",
    ],
  },
  {
    slug: "bursar",
    title: "Bursar",
    subtitle: "Fees & payments",
    oneLiner: "Track fees. Manage payments. Reduce arrears.",
    pains: ["Fee confusion", "Payment tracking", "Arrears follow-up"],
    stats: ["Real-time balances", "Automated reminders"],
    colorAccent: "#f2b91a", // Gold - Finance
    colorBg: "rgba(242, 185, 26, 0.05)",
    colorBorder: "rgba(242, 185, 26, 0.2)",
    features: [
      "Fee management",
      "Payment tracking",
      "Invoice generation",
      "Receipt printing",
      "Arrears reports",
      "Financial analytics",
    ],
  },
  {
    slug: "procurement",
    title: "Procurement Officer",
    subtitle: "Purchasing & vendors",
    oneLiner: "Manage orders. Track vendors. Control spending.",
    pains: ["Manual requisitions", "Vendor chaos", "Budget overruns"],
    stats: ["Digital procurement", "Vendor portal"],
    colorAccent: "#f2b91a", // Gold - Finance/Admin
    colorBg: "rgba(242, 185, 26, 0.05)",
    colorBorder: "rgba(242, 185, 26, 0.2)",
    features: [
      "Purchase requests",
      "Vendor management",
      "Budget tracking",
      "Order approvals",
      "Inventory control",
      "Spend analytics",
    ],
  },
  {
    slug: "hr-manager",
    title: "HR Manager",
    subtitle: "Staff & payroll",
    oneLiner: "Manage staff. Run payroll. Track performance.",
    pains: ["Manual payroll", "Leave tracking", "Performance gaps"],
    stats: ["Automated payroll", "Digital leave"],
    colorAccent: "#0707a4", // Royal Blue - Management
    colorBg: "rgba(7, 7, 164, 0.05)",
    colorBorder: "rgba(7, 7, 164, 0.2)",
    features: [
      "Staff records",
      "Payroll processing",
      "Leave management",
      "Performance reviews",
      "Contract tracking",
      "HR analytics",
    ],
  },
  {
    slug: "transport",
    title: "Transport Manager",
    subtitle: "Fleet & GPS tracking",
    oneLiner: "Track vehicles. Manage routes. Ensure safety.",
    pains: ["Route chaos", "Vehicle tracking", "Parent complaints"],
    stats: ["GPS tracking", "Route optimization"],
    colorAccent: "#079dff", // Sky Blue - Operations
    colorBg: "rgba(7, 157, 255, 0.05)",
    colorBorder: "rgba(7, 157, 255, 0.2)",
    features: [
      "Vehicle tracking",
      "Route management",
      "Driver scheduling",
      "Maintenance logs",
      "Parent notifications",
      "Safety reports",
    ],
  },
  {
    slug: "librarian",
    title: "Librarian",
    subtitle: "Library management",
    oneLiner: "Catalog books. Track loans. Engage readers.",
    pains: ["Manual cataloging", "Lost books", "Overdue tracking"],
    stats: ["Digital catalog", "Automated reminders"],
    colorAccent: "#079dff", // Sky Blue - Support
    colorBg: "rgba(7, 157, 255, 0.05)",
    colorBorder: "rgba(7, 157, 255, 0.2)",
    features: [
      "Book cataloging",
      "Loan management",
      "Digital library",
      "Reading analytics",
      "Overdue tracking",
      "Collection reports",
    ],
  },
  {
    slug: "boarding",
    title: "Boarding Master",
    subtitle: "Houses & exeats",
    oneLiner: "Manage houses. Track exeats. Ensure pastoral care.",
    pains: ["Exeat tracking", "House management", "Parent approvals"],
    stats: ["Digital exeats", "House oversight"],
    colorAccent: "#0707a4", // Royal Blue - Management
    colorBg: "rgba(7, 7, 164, 0.05)",
    colorBorder: "rgba(7, 7, 164, 0.2)",
    features: [
      "House management",
      "Exeat requests",
      "Roll call tracking",
      "Pastoral records",
      "Parent approvals",
      "Boarding analytics",
    ],
  },
  {
    slug: "class-teacher",
    title: "Class Teacher",
    subtitle: "Homeroom & pastoral care",
    oneLiner: "Know your class. Track wellbeing. Support every learner.",
    pains: ["Pastoral tracking", "Parent communication", "Wellbeing gaps"],
    stats: ["Class insights", "Pastoral notes"],
    colorAccent: "#78c054", // Green - Teaching
    colorBg: "rgba(120, 192, 84, 0.05)",
    colorBorder: "rgba(120, 192, 84, 0.2)",
    features: [
      "Class overview",
      "Attendance tracking",
      "Pastoral notes",
      "Parent messaging",
      "Wellbeing tracking",
      "Class reports",
    ],
  },
  {
    slug: "subject-teacher",
    title: "Subject Teacher",
    subtitle: "Specialized subjects",
    oneLiner: "Teach your subject. Grade faster. Share resources.",
    pains: ["Paper marking", "Resource chaos", "Progress tracking"],
    stats: ["50% faster grading", "Digital resources"],
    colorAccent: "#78c054", // Green - Teaching
    colorBg: "rgba(120, 192, 84, 0.05)",
    colorBorder: "rgba(120, 192, 84, 0.2)",
    features: [
      "Digital gradebook",
      "Lesson planning",
      "Assignment management",
      "Resource library",
      "Assessment tools",
      "Subject analytics",
    ],
  },
  {
    slug: "eca-coach",
    title: "ECA Coach",
    subtitle: "Sports & activities",
    oneLiner: "Manage teams. Track events. Celebrate achievements.",
    pains: ["Team coordination", "Event scheduling", "Achievement tracking"],
    stats: ["Digital rosters", "Event calendar"],
    colorAccent: "#079dff", // Sky Blue - Activities
    colorBg: "rgba(7, 157, 255, 0.05)",
    colorBorder: "rgba(7, 157, 255, 0.2)",
    features: [
      "Team management",
      "Event scheduling",
      "Attendance tracking",
      "Achievement records",
      "Parent notifications",
      "Competition tracking",
    ],
  },
  {
    slug: "student",
    title: "Student",
    subtitle: "Grades & assignments",
    oneLiner: "Learn anywhere. Submit work. Check progress.",
    pains: ["Unclear tasks", "Scattered links", "Late feedback"],
    stats: ["Mobile-first LMS", "Clear to-dos"],
    colorAccent: "#0734ff", // Bright Blue - Innovation/Learning
    colorBg: "rgba(7, 52, 255, 0.05)",
    colorBorder: "rgba(7, 52, 255, 0.2)",
    features: [
      "Assignment dashboard",
      "Grade visibility",
      "Digital submissions",
      "Learning resources",
      "Progress tracking",
      "Mobile access",
    ],
  },
  {
    slug: "parent",
    title: "Parent / Guardian",
    subtitle: "Track child's progress",
    oneLiner: "See grades. Pay fees. Talk to teachers. Stay connected.",
    pains: ["Fee confusion", "Hard to reach teachers", "No visibility"],
    stats: ["Fee portal", "Real-time updates"],
    colorAccent: "#78c054", // Green - Community
    colorBg: "rgba(120, 192, 84, 0.05)",
    colorBorder: "rgba(120, 192, 84, 0.2)",
    features: [
      "Grade tracking",
      "Fee payment",
      "Teacher messaging",
      "Attendance alerts",
      "Event calendar",
      "Mobile app",
    ],
  },
];

// UPDATED: Simple routes without /marketing prefix
const NAV = [
  { label: "Solutions", href: "#/solutions" },
  { label: "Pricing", href: "#/pricing" },
  { label: "About", href: "#/about" },
  { label: "Testimonials", href: "#/testimonials" },
  { label: "FAQ", href: "#/faq" },
  { label: "Contact", href: "#/contact" },
];

const FEATURES = [
  {
    title: "LMS",
    desc: "CBC, 8‑4‑4, BNC & IBE ready.",
    icon: BookOpen,
    color: "text-blue-500",
  },
  {
    title: "Assessments",
    desc: "Plan, grade, and report faster.",
    icon: FileText,
    color: "text-green-500",
  },
  {
    title: "Communication",
    desc: "Teachers ↔ Parents ↔ Students.",
    icon: MessageSquare,
    color: "text-purple-500",
  },
  {
    title: "Finance",
    desc: "Fees, receipts, simple reports.",
    icon: DollarSign,
    color: "text-orange-500",
  },
  {
    title: "Library",
    desc: "Digital resources in one place.",
    icon: GraduationCap,
    color: "text-indigo-500",
  },
  {
    title: "Transport",
    desc: "Routes, riders, notifications.",
    icon: MapPin,
    color: "text-red-500",
  },
];

const TRUST_STATS = [
  { label: "Top schools", value: "50+", icon: Building2 },
  { label: "Active students", value: "25k+", icon: Users },
  { label: "Teachers & staff", value: "2k+", icon: GraduationCap },
  { label: "Curricula supported", value: "4", icon: BookOpen },
];

const TESTIMONIALS = [
  {
    name: "Dr. Sarah Mwangi",
    role: "Principal, Kianda School",
    school: "Nairobi",
    quote:
      "QXP transformed how we manage our school. The time saved on administrative tasks is incredible, and parents love the transparency.",
    rating: 5,
    image: "SM",
  },
  {
    name: "Mr. David Kariuki",
    role: "ICT Manager, Brookhouse",
    school: "Nairobi",
    quote:
      "Implementation was smooth, and the support team is fantastic. Our teachers adapted quickly, and we're seeing real improvements in communication.",
    rating: 5,
    image: "DK",
  },
  {
    name: "Mrs. Grace Akinyi",
    role: "Bursar, Hillcrest School",
    school: "Mombasa",
    quote:
      "Fee management has never been easier. Parents can pay online, and we have real-time visibility into our finances. A game-changer!",
    rating: 5,
    image: "GA",
  },
];

const FAQS = [
  {
    question: "What curricula does QXP support?",
    answer:
      "QXP supports CBC (Competency-Based Curriculum), 8-4-4, British National Curriculum (BNC), and International Baccalaureate (IBE). We work with official KICD curriculum files and can customize for your school's specific needs.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Most schools are up and running within 2-4 weeks. We provide comprehensive onboarding, training for staff, and ongoing support to ensure a smooth transition.",
  },
  {
    question: "Is my school's data secure?",
    answer:
      "Absolutely. We use bank-grade encryption, regular security audits, and comply with Kenyan data protection regulations. Each school's data is completely isolated in our multi-tenant architecture.",
  },
  {
    question: "Can parents access the system?",
    answer:
      "Yes! Parents get their own portal to view grades, pay fees, communicate with teachers, and track their child's progress. We also have a mobile app for on-the-go access.",
  },
  {
    question: "Do you offer training and support?",
    answer:
      "Yes. We provide comprehensive training during onboarding, video tutorials, help documentation, and ongoing email/phone/WhatsApp support. We're here when you need us.",
  },
  {
    question: "What if we need a custom feature?",
    answer:
      "We regularly add features based on customer feedback. For enterprise clients and school groups, we offer custom development services. Contact our sales team to discuss your specific needs.",
  },
  {
    question: "Can we try before we buy?",
    answer:
      "Absolutely! Book a demo to see the platform in action, and we can set up a pilot program for your school to test it with a small group before full deployment.",
  },
  {
    question: "What's included in the pricing?",
    answer:
      "Our pricing includes all features (LMS, assessments, communication, finance, library, transport, etc.), onboarding, training, mobile apps, and ongoing support. No hidden fees.",
  },
];

// -----------------------------
// Utilities
// -----------------------------
const cls = (...arr: (string | boolean | undefined)[]) =>
  arr.filter(Boolean).join(" ");

function formatMoney(amount: number, currency = DEFAULT_CURRENCY) {
  try {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

function getDiscountTier(users: number) {
  return (
    DISCOUNT_TIERS.find(
      (tier) => users >= tier.minUsers && users <= tier.maxUsers
    ) || DISCOUNT_TIERS[0]
  );
}

// Form persistence utilities
function saveFormData(formId: string, data: Record<string, string>) {
  try {
    localStorage.setItem(`qxp_form_${formId}`, JSON.stringify(data));
  } catch (e) {
    console.warn("Could not save form data", e);
  }
}

function loadFormData(formId: string): Record<string, string> | null {
  try {
    const data = localStorage.getItem(`qxp_form_${formId}`);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

function clearFormData(formId: string) {
  try {
    localStorage.removeItem(`qxp_form_${formId}`);
  } catch (e) {
    console.warn("Could not clear form data", e);
  }
}

// -----------------------------
// Animation variants
// -----------------------------
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// -----------------------------
// Components
// -----------------------------
function Stat({ label, value, icon: Icon }: { label: string; value: string; icon?: any }) {
  // Assign colors based on the stat
  const colors = ['blue', 'green', 'purple', 'orange'];
  const colorIndex = TRUST_STATS.findIndex(s => s.label === label) % colors.length;
  const colorName = colors[colorIndex];
  
  const bgClass = `bg-${colorName}-50`;
  const iconBgClass = `bg-${colorName}-500`;
  const textClass = `text-${colorName}-600`;
  const borderClass = `border-${colorName}-200`;
  
  return (
    <motion.div
      variants={fadeInUp}
      className={`rounded-xl border ${borderClass} ${bgClass} p-6 text-center hover:shadow-lg transition group`}
    >
      {Icon && (
        <div className={`inline-flex p-4 rounded-2xl ${iconBgClass} mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      )}
      <div className={`text-3xl ${textClass}`}>{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </motion.div>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cls(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24",
        className
      )}
    >
      {title && (
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl tracking-tight">{title}</h2>
          {subtitle && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.header>
      )}
      {children}
    </section>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#/marketing"
          className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          <motion.img
            src={logoHorizontal}
            alt="QXP Logo"
            className="h-8 w-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-1 transition"
            >
              {n.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href="#/demo">Book Demo</a>
          </Button>
        </nav>
        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg hover:bg-accent"
          onClick={() => setOpen(!open)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border"
        >
          <div className="px-4 py-3 flex flex-col gap-2">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="px-3 py-2 rounded-lg hover:bg-accent"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <Button asChild className="w-full">
              <a href="#/demo" onClick={() => setOpen(false)}>
                Book Demo
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="border-t border-border mt-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter */}
        <div className="mb-12 pb-12 border-b border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl mb-2">Stay updated</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Get the latest updates on new features, case studies, and
              education insights.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex gap-2 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={subscribed}>
                {subscribed ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-green-600 mt-2"
              >
                Thanks for subscribing!
              </motion.p>
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">
                  Q
                </span>
              </div>
              <span className="text-lg font-semibold">QXP LMS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Kenya's leading school operations suite, trusted by 50+ schools.
            </p>
          </div>
          <div>
            <div className="mb-3">Product</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#/solutions"
                  className="hover:text-foreground transition"
                >
                  Solutions
                </a>
              </li>
              <li>
                <a
                  href="#/pricing"
                  className="hover:text-foreground transition"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a href="#/faq" className="hover:text-foreground transition">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#/testimonials"
                  className="hover:text-foreground transition"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3">Company</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#/about" className="hover:text-foreground transition">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#/contact"
                  className="hover:text-foreground transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#/careers"
                  className="hover:text-foreground transition"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3">Legal & Support</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#/privacy"
                  className="hover:text-foreground transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#/terms" className="hover:text-foreground transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@qxp.global"
                  className="hover:text-foreground transition"
                >
                  hello@qxp.global
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/254700779977"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} QXP Global. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
              All systems operational
            </span>
            <span>•</span>
            <span>Made in Kenya 🇰🇪</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// -----------------------------
// Pages
// -----------------------------
function Home() {
  return (
    <>
      <Section id="hero">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2" />
              Trusted by 50+ Top Schools
            </Badge>
            <h1 className="text-4xl sm:text-6xl tracking-tight">
              Kenya's leading school operations suite
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Complete LMS for CBC, 8‑4‑4, BNC & IBE — built for schools,
              teachers, students and parents. One platform for everything.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <a href="#/demo">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#/pricing">See Pricing</a>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Free onboarding
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                24/7 Support
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Mobile apps
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 hover:shadow-2xl transition">
              <DashboardPreview persona="principal" className="scale-100" />
              <p className="text-center text-sm text-muted-foreground mt-4">
                Principal Dashboard — Live preview
              </p>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section id="trust" className="bg-muted/30">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_STATS.map((s) => (
              <Stat
                key={s.label}
                label={s.label}
                value={s.value}
                icon={s.icon}
              />
            ))}
          </div>
        </motion.div>
      </Section>

      <Section
        id="personas"
        title="Who it's for"
        subtitle="Made for the real day‑to‑day of schools."
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PERSONAS.map((p) => (
            <motion.div key={p.slug} variants={fadeInUp}>
              <Card
                className="p-0 hover:shadow-xl transition-all cursor-pointer group h-full overflow-hidden"
                onClick={() => (window.location.hash = `#/solutions/${p.slug}`)}
                style={{
                  borderLeft: `4px solid ${p.colorAccent}`,
                  borderColor: p.colorBorder,
                }}
              >
                <div
                  className="px-6 py-3 border-b"
                  style={{
                    backgroundColor: p.colorBg,
                    borderBottomColor: p.colorBorder,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className="text-lg mb-0.5"
                        style={{ color: p.colorAccent }}
                      >
                        {p.title}
                      </h3>
                      {p.subtitle && (
                        <p className="text-xs text-muted-foreground">
                          {p.subtitle}
                        </p>
                      )}
                    </div>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: p.colorBg }}
                    >
                      <ChevronRight
                        className="h-5 w-5 group-hover:translate-x-1 transition"
                        style={{ color: p.colorAccent }}
                      />
                    </div>
                  </div>
                </div>

                {/* Dashboard Preview */}
                <div className="px-4 pt-4 pb-2">
                  <DashboardPreview persona={p.slug} />
                </div>

                <div className="px-6 py-4 pt-2">
                  <p className="text-sm text-muted-foreground">{p.oneLiner}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="px-0 group-hover:gap-2 transition-all h-auto py-0"
                      style={{ color: p.colorAccent }}
                    >
                      <a href={`#/solutions/${p.slug}`}>
                        View details{" "}
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section
        id="features"
        title="Everything you need"
        subtitle="Powerful modules to run your school efficiently"
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            // Extract color from text-color-500 format
            const colorName = f.color.replace("text-", "").replace("-500", "");
            const bgClass = `bg-${colorName}-50`;
            const iconBgClass = `bg-${colorName}-500`;
            const textClass = f.color.replace("-500", "-600");
            const borderClass = `border-${colorName}-200`;

            return (
              <motion.div key={f.title} variants={fadeInUp}>
                <Card
                  className={`p-6 hover:shadow-lg transition h-full border ${borderClass} ${bgClass} group cursor-pointer`}
                >
                  <div
                    className={`inline-flex p-4 rounded-2xl ${iconBgClass} mb-4 group-hover:scale-110 transition-transform shadow-sm`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className={`text-lg mb-2 ${textClass}`}>{f.title}</h3>
                  <p className="text-sm text-gray-600">{f.desc}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>
      <Section
        id="why-qxp"
        title="Why schools choose QXP"
        className="bg-muted/30"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="group"
          >
            <div className="inline-flex p-4 rounded-2xl bg-yellow-500 mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl mb-2 text-yellow-600">
              Fast implementation
            </h3>
            <p className="text-sm text-gray-600">
              Most schools go live in 2-4 weeks with our comprehensive
              onboarding and training support.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group"
          >
            <div className="inline-flex p-4 rounded-2xl bg-green-500 mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl mb-2 text-green-600">Bank-grade security</h3>
            <p className="text-sm text-gray-600">
              Your school's data is encrypted, backed up daily, and fully
              compliant with Kenyan regulations.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group"
          >
            <div className="inline-flex p-4 rounded-2xl bg-purple-500 mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl mb-2 text-purple-600">Excellent support</h3>
            <p className="text-sm text-gray-600">
              Email, phone, and WhatsApp support when you need it. We're here to
              help you succeed.
            </p>
          </motion.div>
        </div>
      </Section>

      <Section
        id="platform-gallery"
        title="The real platform"
        subtitle="See actual dashboards used by schools every day. No mockups."
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            "principal",
            "teacher",
            "student",
            "parent",
            "bursar",
            "registrar",
          ].map((personaSlug) => {
            const persona = PERSONAS.find(
              (p) =>
                p.slug === personaSlug ||
                (p.slug === "subject-teacher" && personaSlug === "teacher")
            );
            const displayPersona =
              persona || PERSONAS.find((p) => p.slug === "subject-teacher");
            if (!displayPersona) return null;

            return (
              <motion.div key={personaSlug} variants={fadeInUp}>
                <Card
                  className="p-4 hover:shadow-xl transition-all cursor-pointer group overflow-hidden"
                  onClick={() =>
                    (window.location.hash = `#/marketing/solutions/${displayPersona.slug}`)
                  }
                  style={{
                    borderTop: `3px solid ${displayPersona.colorAccent}`,
                  }}
                >
                  <div className="mb-3">
                    <h3
                      className="text-sm font-medium mb-1"
                      style={{ color: displayPersona.colorAccent }}
                    >
                      {personaSlug === "teacher"
                        ? "Teacher"
                        : displayPersona.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {displayPersona.subtitle}
                    </p>
                  </div>
                  <DashboardPreview persona={displayPersona.slug} />
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Click to explore
                    </span>
                    <ChevronRight
                      className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                      style={{ color: displayPersona.colorAccent }}
                    />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            See all 15 role-specific dashboards
          </p>
          <Button asChild variant="outline" size="lg">
            <a href="#/marketing/solutions">
              View all solutions <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </Section>
      <Section id="cta">
        <Card className="p-12 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <h3 className="text-3xl mb-3">Ready to transform your school?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 50+ leading schools already using QXP. Book a personalized demo
            and see how we can help.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button asChild size="lg">
              <a href="#/demo">
                Book a demo <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://wa.me/254700779977"
                target="_blank"
                rel="noreferrer"
              >
                <Phone className="mr-2 h-4 w-4" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}

function SolutionsIndex() {
  return (
    <Section
      title="Solutions by role"
      subtitle="See how QXP helps every member of your school community with real platform interfaces."
    >
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {PERSONAS.map((p) => (
          <motion.div key={p.slug} variants={fadeInUp}>
            <Card
              className="p-0 hover:shadow-xl transition-all cursor-pointer group h-full overflow-hidden"
              onClick={() => (window.location.hash = `#/solutions/${p.slug}`)}
              style={{
                borderLeft: `4px solid ${p.colorAccent}`,
                borderColor: p.colorBorder,
              }}
            >
              <div
                className="px-6 py-3 border-b"
                style={{
                  backgroundColor: p.colorBg,
                  borderBottomColor: p.colorBorder,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className="text-lg mb-0.5"
                      style={{ color: p.colorAccent }}
                    >
                      {p.title}
                    </h3>
                    {p.subtitle && (
                      <p className="text-xs text-muted-foreground">
                        {p.subtitle}
                      </p>
                    )}
                  </div>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: p.colorBg }}
                  >
                    <ChevronRight
                      className="h-5 w-5 group-hover:translate-x-1 transition"
                      style={{ color: p.colorAccent }}
                    />
                  </div>
                </div>
              </div>

              {/* Dashboard Preview */}
              <div className="px-4 pt-4 pb-2">
                <DashboardPreview persona={p.slug} />
              </div>

              <div className="px-6 py-4 pt-2">
                <p className="text-sm text-muted-foreground">{p.oneLiner}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="px-0 group-hover:gap-2 transition-all h-auto py-0"
                    style={{ color: p.colorAccent }}
                  >
                    <a href={`#/solutions/${p.slug}`}>
                      View details{" "}
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function PersonaPage({ slug }: { slug: string }) {
  const persona = PERSONAS.find((p) => p.slug === slug);
  if (!persona) return <NotFound />;

  return (
    <>
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <a
              href="#/solutions"
              className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6"
            >
              ← All solutions
            </a>
            <h1 className="text-3xl sm:text-5xl tracking-tight mb-4">
              {persona.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              {persona.oneLiner}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button asChild size="lg">
                <a href="#/demo">
                  Book Demo <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#/pricing">See pricing</a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card
              className="p-6 overflow-hidden hover:shadow-xl transition-all"
              style={{ borderTop: `4px solid ${persona.colorAccent}` }}
            >
              <div className="mb-4">
                <h3
                  className="font-medium mb-1"
                  style={{ color: persona.colorAccent }}
                >
                  Live Dashboard Preview
                </h3>
                <p className="text-sm text-muted-foreground">
                  Real interface from the QXP platform
                </p>
              </div>
              <DashboardPreview persona={slug} className="scale-100" />
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section title="Key features">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {persona.features.map((f) => (
            <motion.div key={f} variants={fadeInUp}>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:shadow-md transition">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{f}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section>
        <Card className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl mb-2">Ready to see it in action?</h3>
            <p className="text-sm text-muted-foreground">
              Book a 20-minute demo tailored for {persona.title.toLowerCase()}.
            </p>
          </div>
          <Button asChild size="lg">
            <a href="#/demo">
              Book demo <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </Card>
      </Section>
    </>
  );
}

function Pricing() {
  const [students, setStudents] = useState("500");
  const [teachers, setTeachers] = useState("40");
  const [terms, setTerms] = useState("3");

  const users =
    Math.max(0, Number(students) || 0) + Math.max(0, Number(teachers) || 0);
  const tier = getDiscountTier(users);
  const subtotal = users * PRICE_PER_TERM * Math.max(1, Number(terms) || 1);
  const discount = subtotal * (tier.discount / 100);
  const total = subtotal - discount;

  return (
    <>
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl sm:text-5xl tracking-tight mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              One plan with everything included. Volume discounts for larger
              schools.
            </p>

            <Card className="p-8">
              <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
                <div>
                  <h3 className="text-2xl mb-2">Standard Plan</h3>
                  <p className="text-muted-foreground">
                    Everything you need to run your school.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl">
                    {formatMoney(PRICE_PER_TERM, CURRENCIES.KES)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    per term / user
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  "Complete LMS (CBC, 8‑4‑4, BNC, IBE)",
                  "Assessment & grading tools",
                  "Parent portal & mobile app",
                  "Fee management & payments",
                  "Communication (SMS, email, WhatsApp)",
                  "Library management",
                  "Transport tracking",
                  "Attendance & timetabling",
                  "HR & payroll basics",
                  "24/7 support",
                  "Free onboarding & training",
                  "Regular updates & new features",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 mt-6 bg-primary/5 border-primary/20">
              <h4 className="mb-4">Volume Discounts</h4>
              <div className="space-y-2 text-sm">
                {DISCOUNT_TIERS.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-muted-foreground">
                      {t.minUsers === 0 ? "Up to" : t.minUsers}
                      {t.maxUsers === Infinity ? "+" : `-${t.maxUsers}`} users
                    </span>
                    <Badge
                      variant={tier.label === t.label ? "default" : "outline"}
                    >
                      {t.discount}% off
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8 sticky top-24">
              <h3 className="text-xl mb-6">Calculate your cost</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="students">Number of Students</Label>
                  <Input
                    id="students"
                    type="number"
                    min="0"
                    max="50000"
                    value={students}
                    onChange={(e) => setStudents(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="teachers">Number of Teachers/Staff</Label>
                  <Input
                    id="teachers"
                    type="number"
                    min="0"
                    max="5000"
                    value={teachers}
                    onChange={(e) => setTeachers(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="terms">Terms per year</Label>
                  <Select value={terms} onValueChange={setTerms}>
                    <SelectTrigger id="terms" className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 term</SelectItem>
                      <SelectItem value="2">2 terms</SelectItem>
                      <SelectItem value="3">3 terms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6 space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total users</span>
                  <span>{users.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pricing tier</span>
                  <Badge variant="outline">{tier.label}</Badge>
                </div>
                {tier.discount > 0 && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatMoney(subtotal, CURRENCIES.KES)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({tier.discount}%)</span>
                      <span>-{formatMoney(discount, CURRENCIES.KES)}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 p-6 rounded-xl bg-primary/10 border border-primary/20">
                <div className="text-sm text-muted-foreground mb-1">
                  Annual cost
                </div>
                <div className="text-4xl">
                  {formatMoney(total, CURRENCIES.KES)}
                </div>
                {tier.discount > 0 && (
                  <div className="text-sm text-green-600 mt-2">
                    You save {formatMoney(discount, CURRENCIES.KES)} per year!
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-3">
                <Button asChild size="lg" className="w-full">
                  <a href="#/marketing/demo">
                    Get started <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href="#/marketing/contact">Contact sales</a>
                </Button>
              </div>

              <p className="mt-4 text-xs text-muted-foreground text-center">
                * Prices in KES. Taxes may apply. Custom quotes available for
                5,000+ users.
              </p>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(
    () =>
      loadFormData("contact") || {
        name: "",
        email: "",
        school: "",
        phone: "",
        message: "",
      }
  );

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    saveFormData("contact", newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearFormData("contact");
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", school: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <Section
      title="Get in touch"
      subtitle="We'll respond within 1 business day."
    >
      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card className="p-6">
            <Mail className="h-8 w-8 text-primary mb-3" />
            <h3 className="mb-2">Email</h3>
            <a
              href="mailto:hello@qxp.global"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              hello@qxp.global
            </a>
          </Card>

          <Card className="p-6">
            <Phone className="h-8 w-8 text-primary mb-3" />
            <h3 className="mb-2">Phone & WhatsApp</h3>
            <a
              href="https://wa.me/254700779977"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              +254 700 779 977
            </a>
          </Card>

          <Card className="p-6">
            <MapPin className="h-8 w-8 text-primary mb-3" />
            <h3 className="mb-2">Office</h3>
            <p className="text-sm text-muted-foreground">
              Nairobi, Kenya
              <br />
              Westlands
              <br />
              Mon-Fri: 8 AM - 6 PM EAT
            </p>
          </Card>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card className="p-8">
            {submitted ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-16 w-16 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </motion.div>
                <h3 className="text-xl mb-2">Message sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We'll get back to you within 1
                  business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full name *</Label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@school.ac.ke"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="school">School name</Label>
                    <Input
                      id="school"
                      placeholder="Kianda School"
                      value={formData.school}
                      onChange={(e) => handleChange("school", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (WhatsApp)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254 7xx xxx xxx"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="message">How can we help? *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your school and what you're looking for..."
                      required
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div className="mt-8 flex gap-3 flex-wrap">
                  <Button type="submit" size="lg">
                    Send message <Send className="ml-2 h-4 w-4" />
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a
                      href="https://wa.me/254700779977"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

function Demo() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(
    () =>
      loadFormData("demo") || {
        name: "",
        email: "",
        school: "",
        role: "",
        date: "",
        time: "",
        notes: "",
      }
  );

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    saveFormData("demo", newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearFormData("demo");
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        school: "",
        role: "",
        date: "",
        time: "",
        notes: "",
      });
    }, 4000);
  };

  return (
    <Section
      title="Book a demo"
      subtitle="See QXP in action with a personalized 20-minute walkthrough."
    >
      <Card className="p-8 max-w-3xl mx-auto">
        {submitted ? (
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-16 w-16 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-4"
            >
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </motion.div>
            <h3 className="text-xl mb-2">Demo booked!</h3>
            <p className="text-muted-foreground mb-2">
              We'll confirm your demo appointment via email shortly.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your inbox for confirmation and calendar invite.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="d_name">Full name *</Label>
                <Input
                  id="d_name"
                  placeholder="Jane Doe"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="d_email">Email *</Label>
                <Input
                  id="d_email"
                  type="email"
                  placeholder="jane@school.ac.ke"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="d_school">School name</Label>
                <Input
                  id="d_school"
                  placeholder="Kiota School"
                  value={formData.school}
                  onChange={(e) => handleChange("school", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="d_role">Your role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(val) => handleChange("role", val)}
                  required
                >
                  <SelectTrigger id="d_role" className="mt-1.5">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="director">School Director</SelectItem>
                    <SelectItem value="principal">Principal</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="group">School Group</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="d_date">Preferred date</Label>
                <Input
                  id="d_date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="d_time">Preferred time (EAT)</Label>
                <Input
                  id="d_time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="d_notes">Anything specific to cover?</Label>
                <Textarea
                  id="d_notes"
                  rows={4}
                  placeholder="Let us know what aspects of QXP you're most interested in..."
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-3 flex-wrap">
              <Button type="submit" size="lg">
                Book demo <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://wa.me/254700779977"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Or chat on WhatsApp
                </a>
              </Button>
            </div>
          </form>
        )}
      </Card>
    </Section>
  );
}

// Simplified other pages for brevity
function About() {
  return (
    <>
      <Section
        title="About QXP"
        subtitle="Building the future of education in Kenya and beyond."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-2xl mb-4">Our mission</h3>
            <p className="text-muted-foreground mb-6">
              We're on a mission to empower schools across Kenya with
              world-class technology that makes education more accessible,
              efficient, and effective. Every school deserves the tools to
              succeed.
            </p>
            <h3 className="text-2xl mb-4">What we believe</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  Technology should empower educators, not replace them
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Every student deserves access to quality education</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  Parents should have visibility into their child's progress
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>School operations should be simple, not stressful</span>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">2020</div>
                  <div className="text-sm text-muted-foreground">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Schools</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">25k+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section title="Our values" className="bg-muted/30">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Speed",
              desc: "Move fast and ship features that matter. We iterate quickly based on feedback.",
            },
            {
              icon: Shield,
              title: "Trust",
              desc: "Your school's data is sacred. We protect it with bank-grade security.",
            },
            {
              icon: Users,
              title: "Community",
              desc: "We're partners in your success. Your feedback shapes our roadmap.",
            },
          ].map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center h-full">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section>
        <Card className="p-12 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <h3 className="text-2xl mb-4">Want to join our team?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented people who are passionate about
            education technology.
          </p>
          <Button asChild size="lg">
            <a href="#/marketing/careers">
              <Briefcase className="mr-2 h-4 w-4" />
              View open positions
            </a>
          </Button>
        </Card>
      </Section>
    </>
  );
}

function Testimonials() {
  return (
    <Section
      title="What schools say about us"
      subtitle="Real feedback from real educators using QXP every day."
    >
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8"
      >
        {TESTIMONIALS.map((t) => (
          <motion.div key={t.name} variants={fadeInUp}>
            <Card className="p-6 h-full hover:shadow-lg transition">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <Quote className="h-8 w-8 text-primary/20 mb-3" />
              <p className="text-sm text-muted-foreground mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">{t.image}</span>
                </div>
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.school}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 text-center">
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 inline-block">
          <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
          <div className="text-4xl mb-2">4.9/5</div>
          <div className="text-sm text-muted-foreground mb-6">
            Average rating from 50+ schools
          </div>
          <Button asChild>
            <a href="#/marketing/demo">
              See it for yourself <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </Card>
      </div>
    </Section>
  );
}

function FAQ() {
  return (
    <Section
      title="Frequently asked questions"
      subtitle="Everything you need to know about QXP."
    >
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <Card className="p-8 mt-12 text-center">
          <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Our team is here to help. Reach out and we'll get back to you within
            1 business day.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button asChild>
              <a href="#/marketing/contact">Contact us</a>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://wa.me/254700779977"
                target="_blank"
                rel="noreferrer"
              >
                <Phone className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Careers() {
  const openPositions = [
    {
      title: "Senior Full-Stack Engineer",
      department: "Engineering",
      location: "Nairobi / Remote",
      type: "Full-time",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Nairobi",
      type: "Full-time",
    },
    {
      title: "Education Product Manager",
      department: "Product",
      location: "Nairobi",
      type: "Full-time",
    },
  ];

  return (
    <>
      <Section
        title="Join our team"
        subtitle="Help us build the future of education in Kenya."
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-2xl mb-4">Why work at QXP?</h3>
            <ul className="space-y-4">
              {[
                "Make a real impact on education in Kenya",
                "Work with cutting-edge technology",
                "Flexible remote work options",
                "Competitive salary and benefits",
                "Growth opportunities and learning budget",
                "Collaborative, mission-driven team",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
              <Users className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl mb-2">We're growing!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Join a fast-growing team that's transforming how schools operate
                across Kenya.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-1">20+</div>
                  <div className="text-xs text-muted-foreground">
                    Team members
                  </div>
                </div>
                <div>
                  <div className="text-2xl mb-1">3</div>
                  <div className="text-xs text-muted-foreground">
                    Open roles
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>

      <Section title="Open positions" className="bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-4">
          {openPositions.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg mb-1">{position.title}</h3>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{position.department}</Badge>
                      <span>•</span>
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <Button variant="outline">
                    Apply <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Don't see a role that fits? We're always interested in talented
            people.
          </p>
          <Button asChild variant="outline">
            <a href="mailto:careers@qxp.global">
              <Mail className="mr-2 h-4 w-4" />
              Send us your CV
            </a>
          </Button>
        </div>
      </Section>
    </>
  );
}

function LegalPage({ title }: { title: string }) {
  return (
    <Section title={title}>
      <div className="max-w-3xl mx-auto">
        <Card className="p-8">
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground mb-6">
              <strong>Last updated:</strong>{" "}
              {new Date().toLocaleDateString("en-KE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <h3 className="text-xl mb-4">Introduction</h3>
            <p className="text-muted-foreground mb-6">
              This is a placeholder for your {title.toLowerCase()}. Replace this
              content with your actual legal documentation.
            </p>

            <h3 className="text-xl mb-4">Our Commitment</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
              <li>
                We respect data privacy and comply with Kenyan data protection
                regulations
              </li>
              <li>
                We use bank-grade encryption to protect your school's data
              </li>
              <li>
                We're transparent about how we collect, use, and store
                information
              </li>
              <li>We follow WCAG 2.2 AA accessibility guidelines</li>
              <li>
                We're committed to providing excellent service and support
              </li>
            </ul>

            <h3 className="text-xl mb-4">Questions?</h3>
            <p className="text-muted-foreground mb-4">
              If you have any questions about our {title.toLowerCase()}, please
              contact us:
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:legal@qxp.global"
                className="text-primary hover:underline"
              >
                legal@qxp.global
              </a>
              <a
                href="#/marketing/contact"
                className="text-primary hover:underline"
              >
                Contact form
              </a>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function NotFound() {
  return (
    <Section>
      <div className="text-center py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-6xl mb-6">404</div>
          <h1 className="text-4xl mb-4">Page not found</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild size="lg">
              <a href="#/marketing">Go home</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#/marketing/contact">Contact support</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// -----------------------------
// Router - UPDATED for simple routes
// -----------------------------
export default function MarketingWebsite() {
  const [route, setRoute] = useState(() => {
    // Handle both #/ and #/marketing/ routes for compatibility
    const hash = window.location.hash.replace(/^#\/?/, "") || "";
    return hash.startsWith("marketing/")
      ? hash.replace("marketing/", "")
      : hash;
  });

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, "") || "";
      setRoute(
        hash.startsWith("marketing/") ? hash.replace("marketing/", "") : hash
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const parts = useMemo(
    () => route.split("?")[0].split("/").filter(Boolean),
    [route]
  );

  let page = <Home />;
  if (parts[0] === "solutions" && !parts[1]) page = <SolutionsIndex />;
  if (parts[0] === "solutions" && parts[1])
    page = <PersonaPage slug={parts[1]} />;
  if (parts[0] === "pricing") page = <Pricing />;
  if (parts[0] === "contact") page = <Contact />;
  if (parts[0] === "demo") page = <Demo />;
  if (parts[0] === "about") page = <About />;
  if (parts[0] === "testimonials") page = <Testimonials />;
  if (parts[0] === "faq") page = <FAQ />;
  if (parts[0] === "careers") page = <Careers />;
  if (parts[0] === "privacy") page = <LegalPage title="Privacy Policy" />;
  if (parts[0] === "terms") page = <LegalPage title="Terms of Service" />;
  if (parts.length > 0 && page === <Home /> && parts[0] !== "")
    page = <NotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <motion.main
        key={route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {page}
      </motion.main>
      <Footer />
    </div>
  );
}
