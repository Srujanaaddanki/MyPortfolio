"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="heading-text mb-8 text-3xl font-bold text-foreground sm:text-4xl">
            About Me
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              {"Hi, I'm Srujana Addanki"} <span className="inline-block">{"👋🏻"}</span> {"a B.Tech Computer Science and Engineering student at Lovely Professional University, passionate about turning data into actionable insights and building intelligent applications."}
            </p>
            <p>
              My focus areas include Data Analytics, Machine Learning, and Android Development. I enjoy working on projects that combine analytical thinking with practical software solutions, from predictive models to interactive dashboards.
            </p>
            <p>
              With a strong problem-solving mindset and commitment to continuous learning, I strive to stay updated with the latest technologies and best practices in the field. I believe in writing clean, efficient code and creating user-centric applications that make a real impact.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
