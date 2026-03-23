"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Download, Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Codolio icon component
function CodolioIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  )
}

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Srujanaaddanki",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/srujana-addanki/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:srujanaaddanki951@gmail.com",
    icon: Mail,
  },
  {
    name: "Codolio",
    href: "https://codolio.com/profile/SrujanaAddanki",
    icon: CodolioIcon,
  },
]

export function HeroSection() {
  const [showCVPreview, setShowCVPreview] = useState(false)

  const handleDownloadCV = () => {
    // Open Google Drive link in a new tab for download/viewing
    window.open("https://drive.google.com/file/d/16dU0UoE940M40Za0mIet0i6HMFX_yXSG/view?usp=sharing", "_blank")
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with blur effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col-reverse items-center justify-center gap-12 px-4 py-32 md:flex-row md:gap-16">
        {/* Left - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 text-center md:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-lg text-primary"
          >
            {"Hi, I'm"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-text mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            <span className="text-balance">Srujana Addanki</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Data Analyst / Data Science enthusiast, Android Developer, and Machine Learning learner focused on building scalable, reliable applications with intelligent solutions.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 flex items-center justify-center gap-4 md:justify-start"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border bg-card p-3 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.name}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* CV Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-3 md:justify-start"
          >
            <Button
              onClick={() => setShowCVPreview(true)}
              variant="outline"
              size="lg"
              className="gap-2 rounded-full px-6"
            >
              <Eye className="h-4 w-4" />
              Preview CV
            </Button>
            <Button
              onClick={handleDownloadCV}
              size="lg"
              className="gap-2 rounded-full px-6"
            >
              <Download className="h-4 w-4" />
              Download CV
            </Button>
          </motion.div>
        </motion.div>

        {/* Right - Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex-shrink-0"
        >
          <div className="relative">
            {/* Decorative ring */}
            <motion.div
              className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Profile image container */}
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-card bg-card shadow-2xl sm:h-80 sm:w-80">
              <Image
                src="/images/1_MyImage.jpeg"
                alt="Srujana Addanki"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Scroll down</span>
          <div className="h-6 w-4 rounded-full border-2 border-muted-foreground/50">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mx-auto mt-1 h-2 w-1 rounded-full bg-muted-foreground/50"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* CV Preview Modal */}
      <AnimatePresence>
        {showCVPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowCVPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl h-[85vh] bg-card rounded-xl shadow-2xl border border-border overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
                <h3 className="font-semibold text-foreground">CV Preview</h3>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleDownloadCV}
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCVPreview(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              {/* PDF Embed */}
              <div className="h-[calc(100%-65px)] items-center justify-center bg-zinc-900/5 overflow-hidden">
                <iframe
                  src="https://drive.google.com/file/d/16dU0UoE940M40Za0mIet0i6HMFX_yXSG/preview"
                  className="w-full h-full border-none"
                  title="CV Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
