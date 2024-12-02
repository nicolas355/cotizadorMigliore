'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {  Search, PieChart, ShoppingCart } from 'lucide-react'

const tools = [
  {
    title: 'Ayuda para Vender',
    description: 'Optimiza tus listados y estrategias de venta',
    href: '/helpsale',
    icon: ShoppingCart,
    color: 'bg-green-500',
  },
  {
    title: 'Revisar Precios Competencia',
    description: 'Analiza y compara precios del mercado',
    href: '/checkprice',
    icon: Search,
    color: 'bg-blue-500',
  },
  {
    title: 'Suma de Precios',
    description: 'Calcula y optimiza tus márgenes de ganancia',
    href: '/sumaPrecios',
    icon: PieChart,
    color: 'bg-purple-500',
  },
  
]

export default function ToolGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.href}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={tool.href} className="block">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className={`p-6 ${tool.color}`}>
                <tool.icon className="h-8 w-8 text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{tool.title}</h3>
                <p className="text-white text-opacity-80">{tool.description}</p>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <span className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-300 ease-in-out">
                  Usar herramienta →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

