import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Inter } from 'next/font/google'
import { AppWrapper } from '@/components/AppWrapper'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist' })
const interFont = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Bantu Bid - Consortium Bidding Platform',
  description: 'Professional consortium bidding platform for Zambian SME suppliers in the mining sector',
  generator: 'v0.app',
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

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${geistSans.variable} ${interFont.variable}`}>
      <body className="antialiased text-foreground font-geist">
        <AppWrapper>
          {children}
        </AppWrapper>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
