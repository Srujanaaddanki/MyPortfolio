"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredText, setHoveredText] = useState("")
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
    setIsVisible(true)
  }, [cursorX, cursorY])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    // Check if device supports hover (not touch)
    const hasHover = window.matchMedia("(hover: hover)").matches
    if (!hasHover) return

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const headingElement = target.closest(".heading-text, h1, h2, h3")
      
      if (headingElement) {
        setIsHovering(true)
        // Get a snippet of the text for the magnifying effect
        const text = headingElement.textContent || ""
        setHoveredText(text.slice(0, 12))
      } else {
        setIsHovering(false)
        setHoveredText("")
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  // Don't render on touch devices
  if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 80 : 12,
          height: isHovering ? 80 : 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div 
          className={`h-full w-full rounded-full transition-all duration-200 ${
            isHovering 
              ? "border-2 border-primary bg-primary/10 backdrop-blur-sm" 
              : "bg-primary"
          }`}
        >
          {isHovering && hoveredText && (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-xs font-bold text-primary truncate px-2">
                {hoveredText}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Outer ring for hover effect */}
      {isHovering && (
        <motion.div
          className="pointer-events-none fixed z-[9998] rounded-full border border-primary/30"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 80, height: 80, opacity: 0 }}
          animate={{ width: 100, height: 100, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Hide default cursor on headings */}
      <style jsx global>{`
        .heading-text,
        h1,
        h2,
        h3 {
          cursor: none;
        }
        
        @media (hover: hover) {
          body {
            cursor: auto;
          }
        }
      `}</style>
    </>
  )
}
