"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("loading")

    // Open user's email client directly since there is no backend API configured
    window.location.href = `mailto:srujanaaddanki951@gmail.com?subject=Contact from Portfolio&body=${encodeURIComponent(
      `Email: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`
    
    setFormState("success")
    setFormData({ email: "", message: "" })
    setTimeout(() => setFormState("idle"), 3000)
  }

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-text mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            {"Have a project in mind or just want to say hello? I'd love to hear from you!"}
          </p>

          <div className="mx-auto max-w-xl">
            {/* Contact Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 flex items-center justify-center gap-2"
            >
              <Mail className="h-5 w-5 text-primary" />
              <a
                href="mailto:srujanaaddanki951@gmail.com"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                srujanaaddanki951@gmail.com
              </a>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="glass space-y-6 rounded-2xl border border-border/50 p-6 sm:p-8"
            >
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background"
                  disabled={formState === "loading"}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your message..."
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  disabled={formState === "loading"}
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={formState === "loading"}
              >
                {formState === "loading" ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Sending...
                  </>
                ) : formState === "success" ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Message Sent!
                  </>
                ) : formState === "error" ? (
                  <>
                    <AlertCircle className="h-4 w-4" />
                    Failed to Send
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>

              {formState === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-green-600 dark:text-green-400"
                >
                  Thanks for reaching out! {"I'll"} get back to you soon.
                </motion.p>
              )}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
