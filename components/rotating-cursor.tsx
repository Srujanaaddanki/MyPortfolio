"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function RotatingPointer() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    
    // Use capture phase to ensure it gets absolute latest coordinates
    window.addEventListener("mousemove", updatePosition, { capture: true })
    return () => window.removeEventListener("mousemove", updatePosition, { capture: true })
  }, [])

  // Avoid hydration mismatch by waiting until mounted
  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[10000]"
      style={{
        x: position.x,
        y: position.y,
        originX: "4px", // double the origin offset since the size is doubled
        originY: "4px",
      }}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 2.5L20 8.5L12 12L8.5 20L2.5 2.5Z" fill="black" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    </motion.div>
  )
}
