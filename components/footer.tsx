"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

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
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Srujana Addanki. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
