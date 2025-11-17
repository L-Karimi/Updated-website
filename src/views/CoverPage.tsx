/*
 QXP Cover Page - Marketing Website Entry Point
 --------------------------------------------------
 - Clean entry point for the marketing website
 - Professional design with animations
 - Direct navigation to marketing sections
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
  Sparkles,
  ChevronRight,
  DollarSign,
  MessageSquare,
  Phone
} from "lucide-react";
import { motion } from "motion/react";

const MARKETING_SECTIONS = [
  {
    id: "solutions",
    title: "Solutions by Role",
    description: "See how QXP helps every school role with real platform interfaces",
    icon: Users,
    route: "#/marketing/solutions",
    color: "bg-blue-500",
    features: ["15 role-specific dashboards", "Live platform previews", "Persona workflows"]
  },
  {
    id: "pricing",
    title: "Pricing & Calculator",
    description: "Transparent pricing with volume discounts and cost calculator",
    icon: DollarSign,
    route: "#/marketing/pricing",
    color: "bg-green-500",
    features: ["Volume discounts", "Cost calculator", "All features included"]
  },
  {
    id: "demo",
    title: "Book a Demo",
    description: "20-minute personalized walkthrough tailored to your needs",
    icon: Phone,
    route: "#/marketing/demo",
    color: "bg-purple-500",
    features: ["Personalized demo", "Platform walkthrough", "Q&A session"]
  },
  {
    id: "features",
    title: "Platform Features",
    description: "Complete school management suite with 16+ modules",
    icon: Building2,
    route: "#/marketing",
    color: "bg-orange-500",
    features: ["LMS & Academics", "Finance & Fees", "Communication", "Transport"]
  },
  {
    id: "testimonials",
    title: "Testimonials",
    description: "See what 50+ schools say about using QXP every day",
    icon: MessageSquare,
    route: "#/marketing/testimonials",
    color: "bg-teal-500",
    features: ["Real school feedback", "Case studies", "Success stories"]
  },
  {
    id: "contact",
    title: "Contact Sales",
    description: "Get in touch with our education specialists",
    icon: Shield,
    route: "#/marketing/contact",
    color: "bg-indigo-500",
    features: ["1 business day response", "WhatsApp support", "Email & phone"]
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
              <span className="text-primary-foreground font-bold text-lg">Q</span>
            </motion.div>
            <div>
              <div className="text-lg font-semibold">QXP LMS</div>
              <div className="text-xs text-muted-foreground">School Operations Suite</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button asChild size="sm">
              <a href="https://wa.me/254700779977" target="_blank" rel="noreferrer">
                <Phone className="h-4 w-4 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-6">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            Trusted by 50+ Top Schools in Kenya
          </Badge>
          <h1 className="text-4xl sm:text-6xl tracking-tight mb-6">
            Transform Your School with <span className="text-primary">QXP</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Complete school operations suite for <strong>CBC, 8-4-4, BNC & IBE</strong>. 
            Everything you need in one platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <a href="#/marketing/demo">
                Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#/marketing/pricing">See Pricing</a>
            </Button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {[
            { label: "Schools", value: "50+", icon: Building2 },
            { label: "Students", value: "25k+", icon: Users },
            { label: "Teachers", value: "2k+", icon: GraduationCap },
            { label: "Curricula", value: "4", icon: BookOpen },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <Card className="p-6 hover:shadow-lg transition">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Marketing Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl tracking-tight mb-3">
              Explore QXP
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how QXP can transform your school operations with comprehensive features and role-specific solutions
            </p>
          </div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {MARKETING_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <motion.div key={section.id} variants={fadeInUp}>
                  <Card
                    className="p-6 hover:shadow-xl transition-all cursor-pointer group h-full border-2 border-transparent hover:border-primary/20"
                    onClick={() => window.location.hash = section.route}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`${section.color} p-3 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-2">
                          {section.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {section.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                    
                    <div className="space-y-1.5">
                      {section.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-12 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 max-w-4xl mx-auto">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl sm:text-3xl mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 50+ leading schools already using QXP. Book a personalized demo and see the platform in action.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="#/marketing/demo">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#/marketing/pricing">See Pricing</a>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <a href="https://wa.me/254700779977" target="_blank" rel="noreferrer">
                  <Phone className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Features Highlights */}
        <motion.div 
          className="mt-16 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[
            {
              icon: Zap,
              title: "Fast Implementation",
              description: "Most schools go live in 2-4 weeks with comprehensive onboarding"
            },
            {
              icon: Shield,
              title: "Bank-Grade Security",
              description: "Your school's data is encrypted and fully compliant with Kenyan regulations"
            },
            {
              icon: Globe,
              title: "Multi-Curriculum Support",
              description: "CBC, 8-4-4, British National Curriculum, and International Baccalaureate"
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 text-center">
                <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">Q</span>
              </div>
              <div className="text-lg font-semibold">QXP LMS</div>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Kenya's leading school operations suite, trusted by 50+ schools.
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm mb-6">
            <a href="#/marketing/about" className="text-muted-foreground hover:text-foreground transition">
              About
            </a>
            <a href="#/marketing/contact" className="text-muted-foreground hover:text-foreground transition">
              Contact
            </a>
            <a href="#/marketing/privacy" className="text-muted-foreground hover:text-foreground transition">
              Privacy
            </a>
            <a href="#/marketing/terms" className="text-muted-foreground hover:text-foreground transition">
              Terms
            </a>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} QXP Global. All rights reserved.</p>
            <p className="mt-2">Made in Kenya 🇰🇪</p>
          </div>
        </div>
      </footer>
    </div>
  );
}