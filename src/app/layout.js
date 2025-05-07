import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hirakana Yow',
  description: 'Practice Hiragana, Katakana, and Kanji with interactive quizzes. Hirakana.net makes learning Japanese fun and simple and perfect for beginners and language learners.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
