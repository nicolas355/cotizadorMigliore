import ToolGrid from "@/components/ToolCards"
export default function Home() {
  return (
   
    
    
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Herramientas para E-commerce
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Optimiza tus ventas en MercadoLibre con nuestras herramientas especializadas
        </p>
        <ToolGrid />
      </div>
    </main>
  
  
  )
}

