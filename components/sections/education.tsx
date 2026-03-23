"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Calendar, MapPin } from "lucide-react"

interface Education {
  id: string
  degree: string
  institution: string
  period: string
  score?: string
  scoreLabel?: string
}

const education: Education[] = [
  {
    id: "edu-1",
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Lovely Professional University",
    period: "Aug 2023 - Present",
  },
  {
    id: "edu-2",
    degree: "Intermediate",
    institution: "Sri Chaitanya Junior Kalasala",
    period: "Completed",
    score: "95.1%",
    scoreLabel: "Percentage",
  },
  {
    id: "edu-3",
    degree: "Matriculation",
    institution: "Sri Chaitanya High School",
    period: "Completed",
    score: "100%",
    scoreLabel: "Percentage",
  },
]

function EducationCard({ edu, index }: { edu: Education; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative"
    >
      {/* Timeline connector */}
      {index < education.length - 1 && (
        <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-primary/50 to-border hidden md:block" />
      )}
      
      <div className="glass group relative rounded-xl border border-border/50 p-6 transition-all hover:border-primary/30 hover:shadow-lg">
        {/* Timeline dot */}
        <div className="absolute -left-3 top-8 hidden h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background md:flex">
          <div className="h-2 w-2 rounded-full bg-primary" />
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                {edu.period}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {edu.degree}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {edu.institution}
            </p>
          </div>
          
          {edu.score && (
            <div className="flex-shrink-0 text-right">
              <div className="inline-flex flex-col items-center rounded-lg bg-primary/10 px-4 py-2">
                <span className="text-2xl font-bold text-primary">
                  {edu.score}
                </span>
                <span className="text-xs text-muted-foreground">
                  {edu.scoreLabel}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function EducationSection() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const stickyRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section id="education" className="bg-secondary/30 py-24">
      <div ref={containerRef} className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr]">
          {/* Sticky Heading */}
          <motion.div
            ref={stickyRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-32 md:self-start"
          >
            <h2 className="heading-text text-3xl font-bold text-foreground sm:text-4xl">
              Education
            </h2>
            <p className="mt-4 text-muted-foreground">
              My academic journey and qualifications
            </p>
          </motion.div>

          {/* Education Cards */}
          <div className="space-y-6 md:pl-8">
            {education.map((edu, index) => (
              <EducationCard key={edu.id} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
