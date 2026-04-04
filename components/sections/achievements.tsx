"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

const achievements = [
  {
    id: "oracle",
    title: "OCI 2025 Data Science Certified",
    description: "Recognized for expertise in data science and analytics.",
    image: "/images/6_OracleBadge.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=317F8ED0F85D446AA9CAB8C0F431A5530FBCD6D74B7B81920DB8BF8DD62F94AB"
  },
  {
    id: "oneworld",
    title: "3rd Runner-Up – One World Competition",
    description: "Secured top position in competitive problem-solving event.",
    image: "/images/7_OneWorld.jpeg",
    link: null
  },
  {
    id: "leetcode",
    title: "Solved 350+ DSA Problems",
    description: "Solved 350+ problems on Data Structures and Algorithms platforms, showcasing strong analytical thinking, coding proficiency, and consistent practice.",
    image: "/images/11_LeetcodeHeatMap.jpg",
    link: null
  }
]

export function AchievementsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="achievements" className="py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
           ref={ref}
           initial={{ opacity: 0, y: 50 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="heading-text mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Achievements
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Key accomplishments highlighting technical expertise and competitive problem-solving.
          </p>
        </motion.div>
        
        <div className="mx-auto max-w-5xl grid gap-8 sm:grid-cols-2">
          {achievements.map((item, i) => {
            const isClickable = !!item.link;
            
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`glass group h-full flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl ${isClickable ? "cursor-pointer" : ""}`}
              >
                {/* Header Image block similar to Projects */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary/20 dark:bg-zinc-800/50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Text Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {isClickable && (
                      <div className="text-muted-foreground transition-colors group-hover:text-primary shrink-0 mt-1">
                        <ExternalLink className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
            
            if (isClickable) {
              return (
                <a key={item.id} href={item.link as string} target="_blank" rel="noopener noreferrer" className="block h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl">
                  {CardContent}
                </a>
              )
            }
            
            return <div key={item.id} className="block h-full">{CardContent}</div>
          })}
        </div>
      </div>
    </section>
  )
}
