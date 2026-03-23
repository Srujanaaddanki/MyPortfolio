"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronDown, ExternalLink } from "lucide-react"
import Image from "next/image"

const internships = [
  {
    id: "techtip24",
    title: "Data Analytics Corporate Training Program",
    organization: "TechTip24",
    duration: "Present",
    link: "https://www.linkedin.com/posts/srujana-addanki_dataanalytics-activity-7119045768824107008-t_sI",
    imageLogo: "/images/9_Techtip24Logo.png",
    points: [
      "Currently undergoing intensive training in Data Analytics methodologies and best practices",
      "Learning to build and deploy comprehensive data pipelines and visualization dashboards for business intelligence",
      "Gaining hands-on experience with industry standard tools and real-world corporate data sets"
    ]
  },
  {
    id: "pathshala",
    title: "DSA & Problem Solving using Java (Industrial Training)",
    organization: "Programming Pathshala / LPU Mentorship",
    duration: "Jan 2026 - Feb 2026",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7433146848200179712/",
    imageLogo: "/images/10_ProgrammingPatashalaLogo.png",
    points: [
      "Developed strong logical thinking and structured problem-solving skills for Data Structures using Java",
      "Learned how to break down complex problems into efficient, optimized solutions for coding interviews",
      "Gained confidence in solving real-world DSA problems with consistency and industry-oriented approach"
    ]
  },
  {
    id: "cipherschools",
    title: "Data Structures & Algorithms using C++",
    organization: "CipherSchools",
    duration: "Jun 2025 – Jul 2025",
    link: "https://drive.google.com/file/d/1ais01_mOJqesiRGkXULmoaRXHli5FDiQ/view?usp=sharing",
    imageLogo: "/images/8_CipherSchoolLogo.png",
    points: [
      "Built strong foundations in Data Structures including Stacks, Queues, Trees, and advanced problem-solving techniques using C++",
      "Applied OOP concepts such as classes, objects, and memory management to develop structured solutions",
      "Improved algorithmic efficiency by implementing sorting and optimization techniques reducing time complexity"
    ]
  }
]

function InternshipCard({ item, index }: { item: typeof internships[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // ExternalLink is only active when link is not '#'
  const hasLink = item.link !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-xl border border-border bg-zinc-50 shadow-sm transition-all hover:shadow-md dark:bg-zinc-900/50"
    >
      <div 
        className="flex cursor-pointer flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4 sm:items-center">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 border border-primary/20">
              <Image 
                src={item.imageLogo} 
                alt={`${item.organization} logo`} 
                fill
                className="object-contain p-2"
              />
            </div>
          <div>
            <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">{item.organization}</p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end sm:gap-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">{item.duration}</span>
            <a 
              href={hasLink ? item.link : undefined}
              target={hasLink ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={(e) => {
                if (hasLink) e.stopPropagation();
                else e.preventDefault();
              }}
              className={`rounded-full p-1.5 transition-colors ${!hasLink ? "text-muted-foreground/30 cursor-default" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <ChevronDown 
            className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
          />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 px-6 py-5">
              <ul className="space-y-3">
                {item.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function InternshipsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="internships" className="py-24">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-text mb-12 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Internships & Training
          </h2>

          <div className="flex flex-col gap-4">
            {internships.map((item, index) => (
              <InternshipCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
