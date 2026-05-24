"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Code2, 
  Database, 
  Brain, 
  Smartphone, 
  Cloud, 
  Wrench,
  Construction,
  Github
} from "lucide-react"

import skillsData from "@/data/skills/skills.json"

interface SkillItem {
  name: string
  icon: string
}

interface SkillCategory {
  id: string
  name: string
  skills: SkillItem[]
  badge?: string
}

const skillCategories = skillsData.categories as SkillCategory[]
const softSkills = skillsData.softSkills as string[]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState("languages")

  const activeCategory = skillCategories.find((cat) => cat.id === activeTab)

  return (
    <section id="skills" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-12 text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            My Skills
          </h2>

          {/* Tab Navigation */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all shadow-sm hover:scale-105 hover:shadow-md border ${
                  activeTab === category.id
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-black border-transparent shadow-md"
                    : "bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 border-border"
                }`}
              >
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Skills Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-4xl"
            >
              <div className="flex flex-col items-center">
                <div className="mb-6 flex items-center justify-center gap-3">
                  {activeCategory?.badge && (
                    <span className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground">
                      <Construction className="h-3 w-3" />
                      {activeCategory.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap justify-center gap-5">
                  {activeCategory?.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
                      className="group flex flex-col items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-900 p-6 text-sm font-medium shadow-sm transition-all hover:shadow-lg border border-border w-36 h-36"
                    >
                      <span className="text-center font-semibold text-zinc-800 dark:text-zinc-100">{skill.name}</span>
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white dark:bg-zinc-800 p-2 shadow-sm">
                        <img src={skill.icon} alt={skill.name} className="h-9 w-9 object-contain group-hover:scale-110 transition-transform duration-300" />
                      </div>

                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            {softSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-full bg-zinc-100 dark:bg-zinc-800 border border-border px-5 py-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 shadow-sm"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
