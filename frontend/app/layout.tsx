import type { Metadata } from 'next'
import { Space_Grotesk, Noto_Sans, Inter } from 'next/font/google' // Import Inter font
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans',
})

const inter = Inter({ // Define Inter font
  subsets: ['latin'],
  weight: ['400', '700'], // Only need 400 and 700 for this use case
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'HackClub ASIET - Student Registration',
  description: 'Join HackClub ASIET now!',
  icons: {
    icon: '/assets/hackclubasiet.png', // Use the relative path from public/
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${notoSans.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  )
}
