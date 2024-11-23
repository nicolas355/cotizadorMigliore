import Logo from "@/components/Logo"
import Cotizador from "@/components/MainPage"
export default function Home() {
  return (
   
    
      <section>

<div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
         
        </div>
      </header>
      <main className="container mx-auto mt-8 p-4">
        <Cotizador />
      </main>
    
    </div>

    


      </section>
  
  
  )
}

