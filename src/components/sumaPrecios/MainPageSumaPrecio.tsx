'use client'

import { useState, useEffect } from 'react'

export default function PriceCalculator() {
  const [desiredPrice, setDesiredPrice] = useState('')
  const [percentage, setPercentage] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [realPrice, setRealPrice] = useState('')

  const formatNumber = (num: number) => {
    return num.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).replace(',00', '')
  }

  useEffect(() => {
    if (desiredPrice && percentage) {
      const basePrice = parseFloat(desiredPrice)
      const percentageValue = parseFloat(percentage)
      
      // Calculate sale price (adding percentage)
      const calculatedSalePrice = basePrice * (1 + percentageValue / 100)
      setSalePrice(formatNumber(calculatedSalePrice))
      
      // Calculate real price (with marketplace fees simulation - 3.35%)
      const calculatedRealPrice = calculatedSalePrice * (1 - 0.0335)
      setRealPrice(formatNumber(calculatedRealPrice))
    }
  }, [desiredPrice, percentage])

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">REVISAR PRECIOS COMPETENCIA</h1>
          <h2 className="text-xl">HERRAMIENTA PARA PUBLICAR</h2>
        </div>

        {/* Input Fields */}
        <div className="flex justify-between items-start gap-8">
          <div className="flex-1">
            <label className="block text-sm font-bold mb-2">
              PRECIO DE VENTA DESEADO PRODUCTO
            </label>
            <input
              type="number"
              value={desiredPrice}
              onChange={(e) => setDesiredPrice(e.target.value)}
              className="w-full p-2 border bg-white"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold mb-2">
              PORCENTAJE A APLICAR
            </label>
            <div className="relative">
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full p-2 border bg-white"
              />
              <span className="absolute right-3 top-2">%</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center">RESULTADOS</h2>
          
          {/* Sale Price */}
          <div className="flex justify-between items-center">
            <span className="font-bold">PRECIO DE VENTA A COLOCAR</span>
            <div className="bg-white p-2 min-w-[150px] text-right">
              {salePrice}
            </div>
          </div>

          {/* Marketplace Preview */}
          {salePrice && (
            <div className="bg-white p-4 rounded">
              <div className="flex items-center gap-2">
                <span className="text-lg">$ {salePrice}</span>
                <span className="text-xs text-gray-500">
                  Ofrece cuotas al mismo precio que publicaste | Stock: 49 u.
                </span>
              </div>
              <div className="mt-2">
                <span className="text-green-500 font-bold">10% OFF</span>
                <div className="text-sm text-gray-600">
                  <div>7% ${formatNumber(parseFloat(salePrice.replace('.', '')) * 0.07)} a tu cargo</div>
                  <div>3% ${formatNumber(parseFloat(salePrice.replace('.', '')) * 0.03)} a cargo de Mercado Libre</div>
                </div>
                <div className="mt-1">
                  Precio final ${formatNumber(parseFloat(salePrice.replace('.', '')) * 0.9)}
                </div>
              </div>
            </div>
          )}

          {/* Real Price */}
          <div className="flex justify-between items-center">
            <span className="font-bold">PRECIO DE VENTA REAL (AL VENDEDOR)</span>
            <div className="bg-white p-2 min-w-[150px] text-right">
              {realPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

