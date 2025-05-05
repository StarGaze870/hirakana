import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { MainContent } from "./components/main";

export default function Home() {

  return (
    <div className='d-flex flex-column' style={{ height: '100vh' }}>

      {/* HEADER */}
      <header>
        <Header />
      </header>

      {/* MAIN CONTENT */}
      <MainContent />

      {/* FOOTER */}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}