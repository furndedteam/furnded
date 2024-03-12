import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Furnded Home',
  description: 'Best Way To Save',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <script src="//code.tidio.co/e0ceg9ltllyuw69ffevlpmc93ejqulqo.js" async></script>
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  )
}
