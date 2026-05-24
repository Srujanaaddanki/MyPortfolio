"use client"

import { motion } from "framer-motion"
import * as LucideIcons from "lucide-react"
import quickLinks from "@/data/recruiter/quicklinks.json"

export function RecruiterQuickAccess() {
  const handleCardClick = (target: string) => {
    if (target === "resume") {
      // Trigger the custom resume modal open event
      window.dispatchEvent(new CustomEvent("open-resume-modal"))
    } else if (target.startsWith("#")) {
      const element = document.getElementById(target.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <section className="relative -mt-16 z-20 mx-auto max-w-6xl px-4">
      <div className="glass rounded-3xl border border-border/50 bg-zinc-50/80 p-8 shadow-xl backdrop-blur-md dark:bg-zinc-900/80">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              ⚡ Recruiter Quick Access
            </h3>
            <p className="text-sm text-muted-foreground">
              Direct pathways to verify skills, experience, and download documents.
            </p>
          </div>
          <div className="h-1 w-12 rounded bg-primary/30 sm:hidden" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {quickLinks.map((link, index) => {
            // Resolve Lucide icon dynamically
            const Icon = (LucideIcons as any)[link.icon] || LucideIcons.HelpCircle

            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(link.target)}
                className="group cursor-pointer rounded-2xl border border-border/40 bg-background/50 p-5 transition-all hover:border-primary/40 hover:shadow-lg dark:hover:bg-zinc-800/40 flex flex-col justify-between h-[140px]"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <LucideIcons.ArrowUpRight className="h-4 w-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                </div>
                
                <div className="mt-4">
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                    {link.title}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {link.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
