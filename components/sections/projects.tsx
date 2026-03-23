"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  features: string[]
  technologies: string[]
  image?: string
  github: string
  demo?: string
}

const projects: Project[] = [
  {
    id: "travel-budget",
    title: "Travel Trip Budget Prediction",
    shortDescription: "ML-powered application to predict travel budgets based on various factors.",
    fullDescription: "A machine learning application that predicts travel trip budgets based on destination, duration, accommodation type, and travel preferences. The model analyzes historical travel data to provide accurate budget estimates, helping users plan their trips effectively.",
    features: [
      "Accurate budget predictions using trained ML models",
      "Interactive interface for entering trip parameters",
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit"],
    image: "/images/2_TravelBudgetPicture.png",
    github: "https://github.com/Srujanaaddanki/TravelTripBudgetPrediction",
    demo: "https://www.linkedin.com/feed/update/urn:li:activity:7409296852480606208/",
  },
  {
    id: "travel-dashboard",
    title: "Travel Insights Dashboard",
    shortDescription: "Interactive dashboard for analyzing travel trends and budget patterns.",
    fullDescription: "A comprehensive Power BI dashboard that provides deep insights into travel patterns, budget allocations, and spending trends. The dashboard enables users to visualize travel data through interactive charts and make data-driven decisions for future trips.",
    features: [
      "Dynamic visualizations of travel spending patterns",
      "Filter and drill-down capabilities for detailed analysis",
    ],
    technologies: ["Power BI", "Excel", "Data Analysis", "DAX"],
    image: "/images/3_TravelInsightsBI.png",
    github: "https://github.com/Srujanaaddanki/Travel-Insights-Budget-Analysis-Dashboard",
    demo: "https://www.linkedin.com/feed/update/urn:li:activity:7408048091989282816/",
  },
  {
    id: "hr-analytics",
    title: "HR Analytics Dashboard",
    shortDescription: "Data-driven dashboard for HR insights and employee analytics.",
    fullDescription: "An HR Analytics Dashboard built to analyze employee data, track attrition rates, and identify key factors affecting workforce dynamics. The solution helps HR teams make informed decisions about talent management and retention strategies.",
    features: [
      "Employee attrition analysis with predictive insights",
      "Department-wise performance metrics visualization",
    ],
    technologies: ["Power BI", "Excel", "SQL", "Data Visualization"],
    image: "/images/4_HR_AnalysisDashboard.png",
    github: "https://github.com/Srujanaaddanki/HR-Analytics-Dashboard",
    demo: "https://www.linkedin.com/feed/update/urn:li:activity:7318343827302371329/",
  },
  {
    id: "android-app",
    title: "Android Compose App",
    shortDescription: "Modern Android application built with Jetpack Compose.",
    fullDescription: "A modern Android application featuring a complete signup and login system built with Jetpack Compose. The app demonstrates best practices in Android development including clean architecture, state management, and Material Design 3 components.",
    features: [
      "Clean UI with Jetpack Compose and Material Design 3",
      "Secure authentication flow with form validation",
    ],
    technologies: ["Kotlin", "Jetpack Compose", "Android Studio", "Material Design 3"],
    image: "/images/5_AndroidSignIn.png",
    github: "https://github.com/Srujanaaddanki/Android-Compose-Signup-Login-App",
  },
]

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateY: 5, rotateX: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      className="group cursor-pointer perspective-1000"
    >
      <div className="glass relative overflow-hidden rounded-2xl border border-border/50 shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Sparkles className="h-12 w-12 text-primary/30" />
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.shortDescription}
          </p>
          
          {/* Tech stack preview */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border/50 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-secondary p-2 text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary/10 to-accent/10">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain p-4"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Sparkles className="h-16 w-16 text-primary/30" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h3 className="mb-4 text-2xl font-bold text-foreground">
            {project.title}
          </h3>
          
          <p className="mb-6 text-muted-foreground leading-relaxed">
            {project.fullDescription}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Key Features
            </h4>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button asChild className="gap-2">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
            {project.demo && (
              <Button variant="outline" asChild className="gap-2">
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Watch Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-text mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            A selection of projects showcasing my expertise in data analytics, machine learning, and mobile development.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </div>

          {/* Github Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <a
              href="https://github.com/srujana-addanki"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 px-8 py-4 text-base font-semibold text-zinc-900 dark:text-zinc-100 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <Github className="h-5 w-5 transition-transform group-hover:rotate-12" />
              View More on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
