import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from '@/components/theme-provider'
import { Oneko } from '@/components/oneko'
import { RotatingPointer } from '@/components/rotating-cursor'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'Srujana Addanki | Data Analyst & Developer',
  description: 'Portfolio of Srujana Addanki - Data Analyst, Data Science enthusiast, Android Developer, and Machine Learning learner focused on building scalable, reliable applications with intelligent solutions.',
  keywords: ['Data Analyst', 'Machine Learning', 'Android Developer', 'Python', 'Data Science', 'Portfolio'],
  authors: [{ name: 'Srujana Addanki' }],
  openGraph: {
    title: 'Srujana Addanki | Data Analyst & Developer',
    description: 'Data Analyst, Data Science enthusiast, Android Developer, and Machine Learning learner.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <RotatingPointer />
        <Oneko />
      </body>
    </html>
  )
}
