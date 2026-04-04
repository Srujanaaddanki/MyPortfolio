"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Award, ChevronLeft, ChevronRight, X } from "lucide-react"
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
  onClick 
}: { 
  cert: typeof certificates[0], 
  onClick: () => void 
}) {
  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      layout
      whileHover={{ scale: 1.05 }}
      className="glass group flex-shrink-0 w-80 cursor-pointer rounded-xl border border-border bg-card dark:bg-card/90 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30 shadow-sm"
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
      
      <div className="p-5 bg-card relative z-10 flex flex-col h-[130px]">
        <h3 className="font-bold text-foreground line-clamp-2 text-lg">
          {cert.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground truncate" title={cert.platform}>
          {cert.platform}
        </p>
        <p className="mt-auto text-xs font-medium text-muted-foreground/70">
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
  
  const [lightboxId, setLightboxId] = useState<number | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Use the original certificates, duplicatedCerts aren't necessary for state-based index wrap-around
  const certCount = certificates.length

  // Handle navigation button visibility
  // Auto-play interval
  useEffect(() => {
    if (!isInView || isHovered || isDragging || lightboxId !== null) return;

    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % certCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, isHovered, isDragging, lightboxId, certCount]);

  // Handle keyboard navigation for modal AND carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxId !== null) {
        if (e.key === "Escape") setLightboxId(null)
        if (e.key === "ArrowLeft") setLightboxId((prev) => (prev! > 0 ? prev! - 1 : certCount - 1))
        if (e.key === "ArrowRight") setLightboxId((prev) => (prev! < certCount - 1 ? prev! + 1 : 0))
      } else {
        if (e.key === "ArrowLeft") setCarouselIndex((prev) => (prev > 0 ? prev - 1 : certCount - 1))
        if (e.key === "ArrowRight") setCarouselIndex((prev) => (prev < certCount - 1 ? prev + 1 : 0))
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxId, certCount]);

  const handleManualScroll = (direction: "left" | "right") => {
    setCarouselIndex((prev) => {
      if (direction === "left") return prev > 0 ? prev - 1 : certCount - 1;
      return (prev + 1) % certCount;
    });
  }

  // 3D positioning logic
  const getCardProps = (index: number) => {
    // Determine shortest path in circular array
    let offset = index - carouselIndex;
    if (offset > certCount / 2) offset -= certCount;
    if (offset < -certCount / 2) offset += certCount;

    const absOffset = Math.abs(offset);
    
    // Hide cards that are too far
    if (absOffset > 2) {
       return {
         display: true, // indicates hidden using a boolean check later
         animate: { x: 0, y: 0, scale: 0, opacity: 0, filter: "blur(0px)", rotateY: 0, zIndex: 0 },
         transition: {}
       }
    }

    const isActive = offset === 0;
    const isAdjacent = absOffset === 1;

    return {
      display: false,
      animate: {
        x: offset * (isAdjacent ? 160 : 300), // distance
        y: isActive ? -10 : 0, 
        scale: Math.max(1 - absOffset * 0.15, 0.7),
        zIndex: 50 - absOffset,
        opacity: isActive ? 1 : Math.max(1 - absOffset * 0.4, 0.2),
        filter: isActive ? "blur(0px)" : `blur(${absOffset * 2}px)`,
        rotateY: offset * -15 // rotate inwards towards center
      },
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 0.8
      } as const
    };
  }

  return (
    <section 
      id="certifications" 
      className="relative bg-secondary/10 py-24 overflow-hidden"
    >
      {/* Modal Lightbox */}
      <AnimatePresence>
        {lightboxId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setLightboxId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-full flex flex-col items-center justify-center p-2 sm:p-4 rounded-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent close on click inside
            >
              <button
                onClick={() => setLightboxId(null)}
                className="absolute -top-10 right-0 sm:-top-8 sm:-right-8 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition backdrop-blur-sm"
              >
                <X className="h-6 w-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxId((prev) => (prev! > 0 ? prev! - 1 : certCount - 1));
                }}
                className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition backdrop-blur-sm shadow-xl"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxId((prev) => (prev! < certCount - 1 ? prev! + 1 : 0));
                }}
                className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition backdrop-blur-sm shadow-xl"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <div className="relative w-full h-[65vh] sm:h-[75vh] flex items-center justify-center rounded-xl bg-black/40 overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src={`/images/${certificates[lightboxId].image}`}
                  alt={certificates[lightboxId].title}
                  width={1920}
                  height={1080}
                  className="object-contain h-full w-full transform origin-center transition-transform hover:scale-150 active:scale-100 cursor-zoom-in active:cursor-zoom-out duration-300"
                  quality={100}
                />
              </div>

              <div className="mt-6 text-center text-white p-4 max-w-3xl">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{certificates[lightboxId].title}</h3>
                <p className="mt-2 text-sm sm:text-base font-medium opacity-80 text-white/90">
                  {certificates[lightboxId].platform} • {certificates[lightboxId].year}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

        {/* 3D Carousel Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group relative flex items-center justify-center h-[380px] w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Buttons for Carousel */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleManualScroll("left")
            }}
            className="absolute left-2 sm:left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-sm text-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Previous certificate"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleManualScroll("right")
            }}
            className="absolute right-2 sm:right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-sm text-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Next certificate"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Cards Area with Perspective */}
          <div 
            className="relative flex items-center justify-center w-full max-w-5xl h-full perspective-[1200px]"
          >
            {/* Invisible Drag Surface for Mobile Swipes */}
            <motion.div
              className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, { offset, velocity }) => {
                setIsDragging(false)
                const swipe = Math.abs(offset.x) * velocity.x
                if (swipe < -100) {
                  handleManualScroll("right")
                } else if (swipe > 100) {
                  handleManualScroll("left")
                }
              }}
            />

            {certificates.map((cert, index) => {
              const props = getCardProps(index);
              if (props.display) return null; // hidden
              
              return (
                <motion.div
                  key={cert.title}
                  initial={false}
                  animate={props.animate}
                  transition={props.transition as any}
                  className="absolute pointer-events-none" // ensure events pass through to swipe layer unless clicked
                  style={{ zIndex: props.animate.zIndex }}
                >
                  <div className="pointer-events-auto">
                    <CertificationCard 
                      cert={cert} 
                      onClick={() => {
                        // If clicking center card, open lightbox. Otherwise rotate to it.
                        if (index === carouselIndex) {
                          setLightboxId(index)
                        } else {
                          setCarouselIndex(index)
                        }
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
