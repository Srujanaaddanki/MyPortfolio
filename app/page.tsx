import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { SkillsSection } from "@/components/sections/skills"
import { InternshipsSection } from "@/components/sections/internships"
import { ProjectsSection } from "@/components/sections/projects"
import { CertificationsSection } from "@/components/sections/certifications"
import { AchievementsSection } from "@/components/sections/achievements"
import { EducationSection } from "@/components/sections/education"
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <InternshipsSection />
      <ProjectsSection />
      <CertificationsSection />
      <AchievementsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
