import {  Paintbrush } from "lucide-react"
import Link from "next/link"

export default function Logo() {
    return (
      <div className="flex items-center">
                  <Paintbrush className="h-8 w-8 mr-2 text-[#F5201A]" />


          <Link href={'/'}>    <span className="font-bold text-xl">MercadoTools</span></Link>
    
      </div>
    )
  }
  
  