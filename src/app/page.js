import Head from 'next/head';
import { Footer } from "./components/footer";
import { MainContent } from "./components/main";
import Header from './components/header';

export default function Home() {

  return (
    <div className='d-flex flex-column' style={{ height: '100vh' }}>

      {/* SEO + Social Meta */}
      <Head>
        <title>Hirakana - Practice Hiragana & Katakana</title>
        <meta name="description" content="Interactive Hiragana, Katakana, and Kanji quiz. Test your Japanese reading skills online." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://hirakana.net" />

        {/* GOOGLE */}
        <meta name="google-site-verification" content="R69G-d1nPRCFiemrAbXKhnhvjWwAGSY14pq5qPrIaU4" />

        {/* Open Graph / Social */}
        <meta property="og:title" content="Hirakana - Japanese Quiz" />
        <meta property="og:description" content="Practice Hiragana, Katakana, and Kanji online for free." />
        <meta property="og:image" content="nyan.png" />
        <meta property="og:url" content="https://hirakana.net" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hirakana - Japanese Quiz" />
        <meta name="twitter:description" content="Master Kana & Kanji through fun quizzes." />
        <meta name="twitter:image" content="nyan.png" />
      </Head>

      {/* MAIN CONTENT */}
      <MainContent />

      {/* FOOTER */}
      <footer>
        <Footer />
      </footer>
      
    </div>
  )
}