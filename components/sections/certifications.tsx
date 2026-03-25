"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Award, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const certificates = [
  {
    image: "1_BusinessIntelligenceFundamentals_SimpleLearn.png",
    title: "Business Intelligence Fundamentals",
    platform: "Simplilearn",
    year: 2023
  },
  {
    image: "2_peerTopeer_Coursera.png",
    title: "Peer-to-Peer Protocols and Local Area Networks",
    platform: "Coursera - University of Colorado System",
    year: 2024
  },
  {
    image: "3_DeepLearningAndDeploymentOnWeb_DevTown.png",
    title: "Deep Learning and Deployment on Web",
    platform: "DevTown",
    year: 2024
  },
  {
    image: "4_ComputerProgramming_NeoColab.png",
    title: "Computer Programming",
    platform: "NeoColab",
    year: 2024
  },
  {
    image: "5_TheBitsandBytesofComputerNetworking_Coursera.png",
    title: "The Bits and Bytes of Computer Networking",
    platform: "Coursera - Google",
    year: 2024
  },
  {
    image: "6_ObjectOrientedProgramming_NeoColab.png",
    title: "Object Oriented Programming",
    platform: "NeoColab",
    year: 2024
  },
  {
    image: "7_ChatGPT4PromptEngineeringChatGPTGenerativeAI&LLM_Infosys.png",
    title: "ChatGPT-4 Prompt Engineering",
    platform: "Infosys Springboard",
    year: 2025
  },
  {
    image: "8_OCI2025CertifiedDataScienceProfessional_Oracle.png",
    title: "OCI 2025 Certified Data Science Professional",
    platform: "Oracle",
    year: 2025
  },
  {
    image: "9_JavaProgramming_NeoColab.png",
    title: "Java Programming",
    platform: "NeoColab",
    year: 2025
  },
  {
    image: "10_CloudComputing_NPTEL.png",
    title: "Cloud Computing",
    platform: "NPTEL",
    year: 2025
  },
  {
    image: "11_ComputationalTheoryLanguagePrinciple&FiniteAutomataTheory_Infosys.png",
    title: "Computational Theory & Finite Automata",
    platform: "Infosys Springboard",
    year: 2025
  },
  {
    image: "12_OCI2025CertifiedAIFoundationsAssociate.png",
    title: "OCI 2025 Certified AI Foundations Associate",
    platform: "Oracle",
    year: 2025
  },
  {
    image: "13_BuildGenerativeAIAppsandSolutionswithNoCodeTools_Infosys.png",
    title: "Build Generative AI Apps with No-Code Tools",
    platform: "Infosys Springboard",
    year: 2025
  },
  {
    image: "14_GraphTheory_AlgoUniversity.png",
    title: "Graph Theory",
    platform: "Algo University",
    year: 2026
  },
  {
    image: "15_MendixRapidDeveloperCertification.png",
    title: "Mendix Rapid Developer Certification",
    platform: "Mendix Academy",
    year: 2026
  }
];

function CertificationCard({ 
  cert, 
  isActive, 
  onClick 
}: { 
  cert: typeof certificates[0], 
  isActive: boolean,
  onClick: () => void 
}) {
  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      layout
      animate={{
        scale: isActive ? 1.15 : 1,
        zIndex: isActive ? 50 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={!isActive ? { scale: 1.05 } : {}}
      className={`glass group flex-shrink-0 w-80 cursor-pointer rounded-xl border border-border bg-card dark:bg-card/90 overflow-hidden transition-shadow duration-300 ${
        isActive 
          ? "shadow-2xl shadow-primary/20 dark:shadow-primary/30 ring-1 ring-primary/50" 
          : "hover:shadow-xl hover:border-primary/30 shadow-sm"
      }`}
    >
      {/* Clean image container */}
      <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800/50 p-4">
        {cert.image ? (
          <Image
            src={`/images/${cert.image}`}
            alt={cert.title}
            fill
            className="object-contain p-4"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Award className="h-12 w-12 text-primary/30" />
          </div>
        )}
      </div>
      
      <div className="p-5 bg-card relative z-10">
        <h3 className="font-bold text-foreground line-clamp-2 text-lg">
          {cert.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground truncate" title={cert.platform}>
          {cert.platform}
        </p>
        <p className="mt-1 text-xs font-medium text-muted-foreground/70">
          {cert.year}
        </p>
      </div>
    </motion.div>
  )
}

export function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "0px" }) // trigger on entry
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const [activeId, setActiveId] = useState<number | null>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const isHovered = useRef(false)
  
  const [showLeftBtn, setShowLeftBtn] = useState(false)
  const [showRightBtn, setShowRightBtn] = useState(true)

  // Duplicated certifications for seamless loop
  const duplicatedCerts = [...certificates, ...certificates]

  // Handle navigation button visibility
  const updateNavButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftBtn(scrollLeft > 10);
    setShowRightBtn(scrollLeft < scrollWidth - clientWidth - 10);
  }

  // Consistent 60fps auto-scroll animation
  useEffect(() => {
    if (!isInView) return // Pause when out of view

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    const scrollSpeed = 0.5

    const scroll = () => {
      // Only scroll if auto-scroll is active, mouse is NOT hovering, and NO card is currently zoomed in focus
      if (isAutoScrolling && !isHovered.current && activeId === null) {
        scrollContainer.scrollLeft += scrollSpeed
        
        // Seamless loop resetting
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0
        }
        
        updateNavButtons()
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [isInView, isAutoScrolling, activeId])

  useEffect(() => {
    updateNavButtons()
    window.addEventListener("resize", updateNavButtons)
    return () => window.removeEventListener("resize", updateNavButtons)
  }, [])

  const handleManualScroll = (direction: "left" | "right") => {
    setIsAutoScrolling(false) // Permanently stop auto-scroll if user interacts
    setActiveId(null) // Un-focus active cards
    
    if (!scrollRef.current) return;
    const scrollAmount = 350
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    })
    
    setTimeout(updateNavButtons, 400)
  }

  return (
    <section 
      id="certifications" 
      className="relative bg-secondary/10 py-24 overflow-hidden"
      onClick={() => setActiveId(null)} // Click outside resets active card
    >
      {/* Invisible overlay catches clicks outside active card */}
      {activeId !== null && (
        <div className="fixed inset-0 z-30" />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-text mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl">
            Certificates & Certifications
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Professional certifications and credentials showcasing continuous learning and expertise development.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group relative"
          onMouseEnter={() => { isHovered.current = true }}
          onMouseLeave={() => { isHovered.current = false }}
        >
          {/* Navigation Buttons */}
          <AnimatePresence>
            {showLeftBtn && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleManualScroll("left")
                }}
                className="absolute -left-4 top-[40%] z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl sm:flex sm:-left-6"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showRightBtn && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleManualScroll("right")
                }}
                className="absolute -right-4 top-[40%] z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl sm:flex sm:-right-6"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Scrolling container (Removed CSS scroll snapping to prevent fighting the JS loop) */}
          <div
            ref={scrollRef}
            onScroll={updateNavButtons}
            className="flex gap-6 overflow-x-auto px-4 py-8 pb-12 sm:px-8 [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {duplicatedCerts.map((cert, index) => (
              <CertificationCard 
                key={`${cert.title}-${index}`}
                cert={cert} 
                isActive={activeId === index}
                onClick={() => setActiveId(activeId === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
