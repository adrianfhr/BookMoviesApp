import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Film from "@/movies/film"

export default function Home() {
    return (
      <main className="h-screen relative overflow-x-hidden scroll-smooth" >
          <Navbar/>
          
        <div className="bg-background">
          <Film/>
        </div>
        <Footer/>
      </main>
    )
  }

