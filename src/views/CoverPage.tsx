/*
 QXP Cover Page - Enhanced Role & Tenant Selection
 --------------------------------------------------
 - Entry point for accessing either the Marketing Website or Platform
 - Clean, professional design with animations
 - Quick role-based navigation
 - Seamless integration with Marketing Website
*/

import React from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  ArrowRight, 
  Building2, 
  GraduationCap, 
  Users, 
  Globe, 
  BookOpen, 
  Shield,
  Zap,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";

const PLATFORM_ROLES = [
  {
    id: "principal",
    title: "Principal",
    description: "Dashboard, approvals, curriculum, assessments",
    icon: GraduationCap,
    route: "#/?role=principal&view=dashboard",
    color: "bg-blue-500",
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "Teaching, grading, attendance, communication",
    icon: BookOpen,
    route: "#/?role=teacher&view=dashboard",
    color: "bg-green-500",
  },
  {
    id: "student",
    title: "Student / Learner",
    description: "Learning, assignments, grades, resources",
    icon: Users,
    route: "#/?role=student&view=home",
    color: "bg-purple-500",
  },
  {
    id: "parent",
    title: "Parent",
    description: "Child's progress, fees, communication",
    icon: Users,
    route: "#/?role=parent&view=home",
    color: "bg-orange-500",
  },
  {
    id: "admin",
    title: "School Admin",
    description: "ICT admin, users, system configuration",
    icon: Shield,
    route: "#/?role=school-admin&view=dashboard",
    color: "bg-red-500",
  },
  {
    id: "qxp-admin",
    title: "QXP Admin",
    description: "Platform control, tenants, monitoring",
    icon: Building2,
    route: "#/?role=qxp-admin&view=dashboard",
    color: "bg-indigo-500",
  },
  {
    id: "government",
    title: "Government",
    description: "National oversight, reporting, analytics",
    icon: Globe,
    route: "#/?role=government&view=dashboard",
    color: "bg-teal-500",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function CoverPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.div 
              className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg className="h-6 w-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </motion.div>
            <div>
              <div className="text-lg">QXP LMS</div>
              <div className="text-xs text-muted-foreground">School Suite</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button asChild variant="outline">
              <a href="#/marketing">
                <Globe className="h-4 w-4 mr-2" />
                Marketing Website
                <ExternalLink className="h-3 w-3 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-6">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            Kenya's Leading School Operations Platform
          </Badge>
          <h1 className="text-4xl sm:text-6xl tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Welcome to QXP
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive multi-tenant SaaS education platform supporting <strong>24 user roles</strong>,
            <strong> CBC, 8-4-4, BNC & IBE</strong> curricula, with bilingual EN/SW support and full <strong>WCAG 2.2 AA</strong> accessibility.
          </p>
        </motion.div>

        {/* Quick Action Cards */}
        <motion.div 
          className="grid sm:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <Card 
              className="p-8 hover:shadow-2xl hover:border-primary/50 transition cursor-pointer group bg-gradient-to-br from-card to-primary/5" 
              onClick={() => window.location.hash = "#/marketing"}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-1">Marketing Website</h3>
                    <Badge variant="secondary">New visitor?</Badge>
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Learn about QXP, explore solutions, view pricing, and book a demo
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Product tour
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Pricing calculator
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Book demo
                </span>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl mb-1">Platform Access</h3>
                  <Badge>Existing user?</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Select your role below to access your personalized dashboard
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap className="h-3 w-3 text-primary" />
                <span>Quick access • Secure login • Multi-role support</span>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl tracking-tight mb-3">
              Select Your Role
            </h2>
            <p className="text-muted-foreground">
              Choose your role to access the appropriate dashboard and features
            </p>
          </div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {PLATFORM_ROLES.map((role) => {
              const Icon = role.icon;
              return (
                <motion.div key={role.id} variants={fadeInUp}>
                  <Card
                    className="p-6 hover:shadow-lg transition-all cursor-pointer group h-full border-0 bg-white hover:bg-gray-50"
                    onClick={() => window.location.href = role.route}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${role.color} p-4 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {role.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {role.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Platform Features */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-8 bg-gradient-to-br from-card to-muted/30">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-xl">Platform Highlights</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl mb-2">24</div>
                <div className="text-sm text-muted-foreground">User Roles</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl mb-2">4</div>
                <div className="text-sm text-muted-foreground">Curricula (CBC, 8-4-4, BNC, IBE)</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl mb-2">14</div>
                <div className="text-sm text-muted-foreground">KICD Files (PP1-Grade 12)</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl mb-2">50K</div>
                <div className="text-sm text-muted-foreground">Schools Capacity</div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* System Info */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Multi-tenant SaaS
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3" />
              Bilingual EN/SW
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3" />
              WCAG 2.2 AA
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3" />
              Mobile Responsive
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3" />
              Light/Dark Mode
            </span>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-8 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground mb-4">
            <p>© {new Date().getFullYear()} QXP Global. All rights reserved.</p>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a href="#/marketing/privacy" className="text-muted-foreground hover:text-foreground transition">
              Privacy
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="#/marketing/terms" className="text-muted-foreground hover:text-foreground transition">
              Terms
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="#/marketing/contact" className="text-muted-foreground hover:text-foreground transition">
              Contact
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="#/marketing/about" className="text-muted-foreground hover:text-foreground transition">
              About
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
