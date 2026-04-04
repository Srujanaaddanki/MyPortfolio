"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const achievements = [
  {
    id: "leetcode",
    title: "Solved 350+ DSA Problems",
    description: "Solved 350+ problems on Data Structures and Algorithms platforms, showcasing strong analytical thinking, coding proficiency, and consistent practice.",
    image: "/images/11_LeetcodeHeatMap.jpg",
    link: null,
    isPrimary: true
  },
  {
    id: "oracle",
    title: "OCI 2025 Data Science Certified",
    description: "Recognized for expertise in data science and analytics.",
    image: "/images/6_OracleBadge.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=317F8ED0F85D446AA9CAB8C0F431A5530FBCD6D74B7B81920DB8BF8DD62F94AB",
    isPrimary: false
  },
  {
    id: "oneworld",
    title: "3rd Runner-Up – One World Competition",
    description: "Secured top position in competitive problem-solving event.",
    image: "/images/7_OneWorld.jpeg",
    link: null,
    isPrimary: false
  }
]

export function AchievementsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [lightboxId, setLightboxId] = useState<number | null>(null)

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxId === null) return;
      if (e.key === "Escape") setLightboxId(null);
      if (e.key === "ArrowLeft") setLightboxId((prev) => (prev! > 0 ? prev! - 1 : achievements.length - 1));
      if (e.key === "ArrowRight") setLightboxId((prev) => (prev! < achievements.length - 1 ? prev! + 1 : 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxId]);

  return (
    <section id="achievements" className="relative py-24 bg-background">
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
                  setLightboxId((prev) => (prev! > 0 ? prev! - 1 : achievements.length - 1));
                }}
                className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition backdrop-blur-sm shadow-xl"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxId((prev) => (prev! < achievements.length - 1 ? prev! + 1 : 0));
                }}
                className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition backdrop-blur-sm shadow-xl"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <div className="relative w-full h-[65vh] sm:h-[75vh] flex items-center justify-center rounded-xl bg-black/40 overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src={achievements[lightboxId].image}
                  alt={achievements[lightboxId].title}
                  width={1920}
                  height={1080}
                  className="object-contain h-full w-full transform origin-center transition-transform hover:scale-150 active:scale-100 cursor-zoom-in active:cursor-zoom-out duration-300"
                  quality={100}
                />
              </div>

              <div className="mt-6 text-center text-white p-4 max-w-3xl">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{achievements[lightboxId].title}</h3>
                <p className="mt-2 text-sm sm:text-base font-medium opacity-80 text-white/90">
                  {achievements[lightboxId].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
        
        <div className="mx-auto max-w-6xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {achievements.map((item, i) => {
            const isClickable = !!item.link;
            const isPrimary = item.isPrimary;
            
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`glass group h-full flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  isPrimary 
                    ? "border-primary/50 shadow-lg shadow-primary/10 relative z-10 hover:-translate-y-2 hover:scale-[1.02]" 
                    : "border-border/50 hover:border-primary/30 hover:-translate-y-1"
                }`}
              >
                {/* Header Image block similar to Projects */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary/20 dark:bg-zinc-800/50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  {isPrimary && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      Featured
                    </div>
                  )}
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
            
            return (
              <div 
                key={item.id} 
                className="block h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl" 
                onClick={() => setLightboxId(i)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault(); 
                    setLightboxId(i); 
                  }
                }}
                tabIndex={0}
                role="button"
              >
                {CardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
