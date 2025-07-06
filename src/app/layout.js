import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import Header from './components/header'
import { Footer } from './components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hirakana Yow',
  description: 'Practice Hiragana, Katakana, and Kanji with interactive quizzes. Hirakana.net makes learning Japanese fun and simple and perfect for beginners and language learners.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " d-flex flex-column"}>
        <Header />
        {children}
        <Footer />

        <Analytics />
      </body>
    </html>
  )
}
