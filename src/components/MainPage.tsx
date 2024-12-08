"use client"

import { useState, useEffect } from "react"
import { Calendar, DollarSign, Percent, Truck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function MainPage() {
  const [basePrice, setBasePrice] = useState<number>(0)
  const [vat] = useState<string>("21")
  const [installmentPlan, setInstallmentPlan] = useState<string>("0")
  const [shippingBuenosAires, setShippingBuenosAires] = useState<number>(0)
  const [shippingOutsideBuenosAires, setShippingOutsideBuenosAires] =
    useState<string>("0")
  const [useReasonability, setUseReasonability] = useState<boolean>(false)
  const [competitor1, setCompetitor1] = useState<number>(0)
  const [competitor2, setCompetitor2] = useState<number>(0)
  const [minMargin, setMinMargin] = useState<number>(7.5)
  const [desiredProfit] = useState<number>(4500)

  // Comisión fija del marketplace
  const FIXED_COMMISSION = 14

  // Opciones de envío
  const shippingOptions = [
    { weight: "Sin Envío", price: 0 },
    { weight: "1 a 2 Kg", price: 5802.5 },
    { weight: "2 a 5 Kg", price: 7717.5 },
    { weight: "5 a 10 Kg", price: 9166.0 },
    { weight: "10 a 15 Kg", price: 10607.0 },
    { weight: "15 a 20 Kg", price: 12441.5 },
    { weight: "20 a 25 Kg", price: 14844.0 },
    { weight: "25 a 30 Kg", price: 20374.0 },
  ]

  const installmentOptions = [
    { label: "Sin Cuotas (0%)", value: "0" },
    { label: "3 cuotas al mismo precio (8,50%)", value: "8.50" },
    { label: "6 cuotas al mismo precio (14,00%)", value: "14" },
    { label: "3 cuotas (CUOTA SIMPLE) - (6,43%)", value: "6.43" },
    { label: "6 cuotas (CUOTA SIMPLE) - (12,27%)", value: "12.27" },
  ]

  // Cálculo del precio final
  const calculateFinalPrice = () => {
    // 1. Calcular costo total con IVA
    const priceWithVat = basePrice * (1 + parseFloat(vat) / 100)

    // 2. Agregar margen mínimo deseado (7.5%)
    const priceWithMinMargin = priceWithVat * (1 + minMargin / 100)

    // 3. Sumar la ganancia deseada fija ($4500 por defecto)
    const priceWithProfit = priceWithMinMargin + desiredProfit

    // 4. Incluir el promedio del costo de envío
    const shippingOutside = parseFloat(shippingOutsideBuenosAires) || 0

    const priceWithBAShipping = priceWithProfit + shippingBuenosAires
    const priceWithOutsideShipping = priceWithProfit + shippingOutside


    

    // 5. Ajustar por la comisión del marketplace (14%)

    // 6. Ajustar por la comisión de cuotas
    let averageShippingPrice =
      (priceWithBAShipping + priceWithOutsideShipping) / 2


        // **Aplicar lógica de razonabilidad**



        if (useReasonability) {
          const difference = Math.abs(shippingBuenosAires - shippingOutside);
          const threshold = shippingBuenosAires * 0.3; // 30% como diferencia significativa
      
          if (difference > threshold) {
            averageShippingPrice *= 0.7; // Aplicar el 70% de descuento
          }
        }
    const installmentCommission = parseFloat(installmentPlan) / 100

    const finalPrice = averageShippingPrice / (1 - FIXED_COMMISSION / 100)
    const finalPriceWithInstallments = finalPrice * (1 + installmentCommission)

    // Redondear a 2 decimales
    return {
      priceWithVat: parseFloat(priceWithVat.toFixed(2)),
      priceWithBAShipping: parseFloat(priceWithBAShipping.toFixed(2)),
      priceWithOutsideShipping: parseFloat(priceWithOutsideShipping.toFixed(2)),
      averageShippingPrice: parseFloat(averageShippingPrice.toFixed(2)),
      finalPrice: Number(finalPriceWithInstallments.toFixed(2)),
    }
  }
  const [calculatedPrices, setCalculatedPrices] = useState({
    priceWithVat: 0,
    priceWithBAShipping: 0,
    priceWithOutsideShipping: 0,
    averageShippingPrice: 0,
    finalPrice: 0,
  })

  useEffect(() => {
    const calculated = calculateFinalPrice()
    setCalculatedPrices({ ...calculated })
  }, [
    basePrice,
    vat,
    shippingBuenosAires,
    shippingOutsideBuenosAires,
    desiredProfit,
    minMargin,
    installmentPlan,
    useReasonability,
  ])

  // Margen de ganancia

  {
    /* const getMarginColor = (currentMargin: number) => {
    if (currentMargin >= minMargin) return "text-green-500"
    if (currentMargin >= minMargin * 0.8) return "text-yellow-500"
    return "text-red-500"
  }*/
  }

  const getDifferenceText = (competitorPrice: number, finalPrice: number) => {
    if (!competitorPrice || !finalPrice) return "Sin información"

    const difference = ((competitorPrice - finalPrice) / finalPrice) * 100
    const formattedDifference =
      Math.abs(difference) < 0.1
        ? "No hay diferencia"
        : `${difference.toFixed(1)}%`
    return formattedDifference
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Cotizador Para Eccomerce
        </CardTitle>
        <CardDescription className="text-center"></CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primera Fila: Valor del Producto */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <Label>Valor del Producto</Label>
              <Input
                type="number"
                value={basePrice || ""}
                onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        {/* Segunda Sección: Todos los Campos en Tres Columnas */}
        <div className="grid grid-cols-3 gap-8">
          {/* Comisión Fija */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
              <Percent className="w-8 h-8 text-white" />
            </div>
            <div className="flex-grow">
              <Label>Comisión Fija (%)</Label>
              <Input placeholder="14" value={FIXED_COMMISSION} readOnly />
            </div>
          </div>

          {/* Plan de Cuotas */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div className="flex-grow">
              <Label>Plan de Cuotas</Label>
              <Select
                value={installmentPlan}
                onValueChange={setInstallmentPlan}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cuotas" />
                </SelectTrigger>
                <SelectContent>
                  {installmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Margen Mínimo Deseado (%) */}
          <div className="flex items-start space-x-4 mt-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
              <Percent className="w-8 h-8 text-white" />
            </div>
            <div className="flex-grow">
              <Label>Margen Mínimo Deseado (%)</Label>
              <Input
                type="number"
                value={minMargin || ""}
                onChange={(e) => setMinMargin(parseFloat(e.target.value) || 0)}
              />
              <span className="text-sm text-gray-500 mt-2 block">
                Margen aplicado:{" "}
                {minMargin > 0 ? `${minMargin.toFixed(2)}%` : "Sin margen"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3">
          {/* Costo de Envío */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <div className="flex-grow">
              <Label>Envío Provincia de Buenos Aires</Label>
              <Input
                type="number"
                value={shippingBuenosAires || ""}
                onChange={(e) =>
                  setShippingBuenosAires(parseFloat(e.target.value) || 0)
                }
              />
            </div>
          </div>

          {/* Envío Fuera de Buenos Aires */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <div className="flex-grow">
              <Label>Envío Fuera de Buenos Aires</Label>
              <Select
                value={shippingOutsideBuenosAires}
                onValueChange={setShippingOutsideBuenosAires}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar peso" />
                </SelectTrigger>
                <SelectContent>
                  {shippingOptions.map((option) => (
                    <SelectItem
                      key={option.weight}
                      value={option.price.toString()}
                    >
                      {option.weight}: $
                      {option.price.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm ">
            {/* Descripción */}
            <div className="flex items-center space-x-4">
              {/* Ícono */}
              <div className="flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-full">
                <span className="text-xl font-bold">ℹ️</span>
              </div>

              {/* Texto */}

              <h2>Razonabilidad</h2>
            </div>

            {/* Checkbox */}
            <input
              type="checkbox"
              checked={useReasonability}
              onChange={() => setUseReasonability(!useReasonability)}
              className="w-6 h-6 border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3">
          {/* Precio Competencia 1 */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div className="flex-grow">
              <Label>Precio Competencia 1</Label>
              <Input
                type="number"
                value={competitor1 || ""}
                onChange={(e) =>
                  setCompetitor1(parseFloat(e.target.value) || 0)
                }
              />
            </div>
          </div>

          {/* Precio Competencia 2 */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div className="flex-grow">
              <Label>Precio Competencia 2</Label>
              <Input
                type="number"
                value={competitor2 || ""}
                onChange={(e) =>
                  setCompetitor2(parseFloat(e.target.value) || 0)
                }
              />
            </div>
          </div>
        </div>

        {/* Resultados */}

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg  mx-auto">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2 text-center">
            Cotización Detallada
          </h2>
          <div className="space-y-4">
            {/* Precio con IVA */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Precio con IVA</span>
              <span className="text-xl">
                $
                {calculatedPrices.priceWithVat.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">
                Precio + Envío 1
                <span className="text-sm text-gray-500 ml-2">
                  (
                  {calculatedPrices.priceWithVat.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  +{" "}
                  {shippingBuenosAires.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                  )
                </span>
              </span>
              <span className="text-xl">
                $
                {calculatedPrices.priceWithBAShipping.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Precio + Envío 2 */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400">
                Precio + Envío 2
                <span className="text-sm text-gray-500 ml-2">
                  (
                  {calculatedPrices.priceWithVat.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  +{" "}
                  {parseFloat(shippingOutsideBuenosAires || "0").toLocaleString(
                    "es-AR",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                  )
                </span>
              </span>
              <span className="text-xl">
                $
                {calculatedPrices.priceWithOutsideShipping.toLocaleString(
                  "es-AR",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </span>
            </div>

            {/* Promedio */}
            <div className="flex justify-between items-center border-t border-gray-700 pt-2">
              <span className="text-gray-400">Promedio</span>
              <span className="text-xl font-medium">
                $
                {calculatedPrices.averageShippingPrice.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* Precio Final */}
            <div className="flex justify-between items-center border-t border-gray-700 pt-2">
              <span className="text-gray-400">Precio Final</span>
              <span className="text-2xl font-bold text-green-400">
                $
                {calculatedPrices.finalPrice.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          {/* Competencias */}
          <div className="mt-6 text-sm text-gray-500">
            {competitor1 > 0 && (
              <div className="flex justify-between items-center">
                <span>Precio Competencia 1:</span>
                <span>
                  $
                  {competitor1.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  ({getDifferenceText(competitor1, calculatedPrices.finalPrice)}
                  )
                </span>
              </div>
            )}
            {competitor2 > 0 && (
              <div className="flex justify-between items-center">
                <span>Precio Competencia 2:</span>
                <span>
                  $
                  {competitor2.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  ({getDifferenceText(competitor2, calculatedPrices.finalPrice)}
                  )
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
