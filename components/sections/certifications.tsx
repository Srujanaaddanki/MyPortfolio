"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Award, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import certificatesData from "@/data/certificates/certificates.json"

interface Certificate {
  title: string
  issuer: string
  year: number
  image: string
  certificateId?: string
  verificationUrl?: string
}

const certificates = certificatesData as Certificate[]

function CertificationCard({ 
  cert, 
  onClick 
}: { 
  cert: Certificate, 
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
            src={cert.image}
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
        <p className="mt-2 text-sm text-muted-foreground truncate" title={cert.issuer}>
          {cert.issuer}
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
  const isInView = useInView(ref, { margin: "0px" })
  const [lightboxId, setLightboxId] = useState<number | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [zoomScale, setZoomScale] = useState(1.0)

  const certCount = certificates.length

  // Reset zoom scale when certificate changes or modal closes
  useEffect(() => {
    setZoomScale(1.0)
  }, [lightboxId])

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

  // Zoom handlers
  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomScale((prev) => Math.min(prev + 0.25, 3.0))
  }

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomScale((prev) => Math.max(prev - 0.25, 1.0))
  }

  const handleDownload = (e: React.MouseEvent, imagePath: string, title: string) => {
    e.stopPropagation()
    // Open image in a new window/tab to download or trigger native save
    const link = document.createElement("a")
    link.href = imagePath
    link.download = `${title.replace(/\s+/g, "_")}_Certificate`
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 3D positioning logic
  const getCardProps = (index: number) => {
    let offset = index - carouselIndex;
    if (offset > certCount / 2) offset -= certCount;
    if (offset < -certCount / 2) offset += certCount;

    const absOffset = Math.abs(offset);
    
    if (absOffset > 2) {
       return {
         display: true,
         animate: { x: 0, y: 0, scale: 0, opacity: 0, filter: "blur(0px)", rotateY: 0, zIndex: 0 },
         transition: {}
       }
    }

    const isActive = offset === 0;
    const isAdjacent = absOffset === 1;

    return {
      display: false,
      animate: {
        x: offset * (isAdjacent ? 160 : 300),
        y: isActive ? -10 : 0, 
        scale: Math.max(1 - absOffset * 0.15, 0.7),
        zIndex: 50 - absOffset,
        opacity: isActive ? 1 : Math.max(1 - absOffset * 0.4, 0.2),
        filter: isActive ? "blur(0px)" : `blur(${absOffset * 2}px)`,
        rotateY: offset * -15
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
      {/* Fullscreen Certificate Viewer Modal */}
      <AnimatePresence>
        {lightboxId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/85 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setLightboxId(null)}
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-5xl flex items-center justify-between z-50 bg-black/40 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10">
              <span className="text-white text-xs sm:text-sm font-semibold truncate max-w-[200px] sm:max-w-md">
                {certificates[lightboxId].title}
              </span>
              
              {/* Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomScale === 1.0}
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition disabled:opacity-30 disabled:pointer-events-none"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4.5 w-4.5" />
                </button>
                <span className="text-white text-xs px-1.5 font-mono select-none">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomScale === 3.0}
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition disabled:opacity-30 disabled:pointer-events-none"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4.5 w-4.5" />
                </button>
                <div className="w-px h-5 bg-white/20 mx-1" />
                <button
                  onClick={(e) => handleDownload(e, certificates[lightboxId].image, certificates[lightboxId].title)}
                  className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
                  title="Download Certificate"
                >
                  <Download className="h-4.5 w-4.5" />
                </button>
                <div className="w-px h-5 bg-white/20 mx-1" />
                <button
                  onClick={() => setLightboxId(null)}
                  className="rounded-full bg-white/15 p-2 text-white hover:bg-white/30 transition shadow"
                  title="Close"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Left Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxId((prev) => (prev! > 0 ? prev! - 1 : certCount - 1));
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition backdrop-blur-sm shadow-xl"
              title="Previous Certificate"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxId((prev) => (prev! < certCount - 1 ? prev! + 1 : 0));
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition backdrop-blur-sm shadow-xl"
              title="Next Certificate"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Viewer Frame */}
            <div 
              className="relative w-full flex-1 flex items-center justify-center overflow-auto my-4"
              onClick={() => setLightboxId(null)}
            >
              <div 
                className="relative max-w-full max-h-[60vh] sm:max-h-[70vh] aspect-[4/3] w-full max-w-3xl transition-transform duration-200 ease-out"
                style={{ transform: `scale(${zoomScale})` }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={certificates[lightboxId].image}
                  alt={certificates[lightboxId].title}
                  fill
                  className="object-contain rounded-lg shadow-2xl"
                  quality={100}
                />
              </div>
            </div>

            {/* Metadata Footer Area */}
            <div className="w-full max-w-3xl text-center text-white pb-2 sm:pb-4 z-50 px-4">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">{certificates[lightboxId].title}</h3>
              <p className="mt-1 text-xs sm:text-sm font-medium opacity-85 text-white/90">
                {certificates[lightboxId].issuer} • {certificates[lightboxId].year}
              </p>

              {/* Conditional Certificate Metadata Display */}
              {(certificates[lightboxId].certificateId || certificates[lightboxId].verificationUrl) && (
                <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs">
                  {certificates[lightboxId].certificateId && (
                    <span className="bg-white/10 px-3 py-1 rounded-md font-mono select-all text-white/90">
                      ID: {certificates[lightboxId].certificateId}
                    </span>
                  )}
                  {certificates[lightboxId].verificationUrl && (
                    <a
                      href={certificates[lightboxId].verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-primary/80 hover:bg-primary text-primary-foreground font-semibold px-3 py-1 rounded-md transition shadow hover:shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Verify Credential
                    </a>
                  )}
                </div>
              )}
            </div>
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
                  className="absolute pointer-events-none"
                  style={{ zIndex: props.animate.zIndex }}
                >
                  <div className="pointer-events-auto">
                    <CertificationCard 
                      cert={cert} 
                      onClick={() => {
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
