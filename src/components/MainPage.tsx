'use client'

import { useState, useEffect } from 'react'
import { Calculator } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function MainPage() {
  const [basePrice, setBasePrice] = useState<number>(0)
  const [vat, setVat] = useState<string>("21")
  const [installmentPlan, setInstallmentPlan] = useState<string>("0")
  const [shippingType1, setShippingType1] = useState<number>(0)
  const [shippingType2, setShippingType2] = useState<string>("5802.50")
  const [useReasonability, setUseReasonability] = useState<boolean>(false)
  const [competitor1, setCompetitor1] = useState<number>(0)
  const [competitor2, setCompetitor2] = useState<number>(0)
  const [minMargin, setMinMargin] = useState<number>(7.5)
  const [desiredProfit, setDesiredProfit] = useState<number>(4500)
  const [finalPrice, setFinalPrice] = useState<number>(0)

  const FIXED_COMMISSION = 14
  const TRANSACTION_FEE = 0.6

  const shippingOptions = [
    { weight: "1 a 2 Kg", price: 5802.50 },
    { weight: "2 a 5 Kg", price: 7717.50 },
    { weight: "5 a 10 Kg", price: 9166.00 },
    { weight: "10 a 15 Kg", price: 10607.00 },
    { weight: "15 a 20 Kg", price: 12441.50 },
    { weight: "20 a 25 Kg", price: 14844.00 },
    { weight: "25 a 30 Kg", price: 20374.00 },
  ]

  const installmentOptions = [
    { label: "Sin cuotas", value: "0" },
    { label: "3 cuotas mismo precio", value: "8.50" },
    { label: "6 cuotas mismo precio", value: "14" },
    { label: "3 cuotas simple", value: "6.43" },
    { label: "6 cuotas simple", value: "12.27" },
  ]

  const calculateShippingAverage = () => {
    const shipping1 = shippingType1
    const shipping2 = parseFloat(shippingType2)

    if (useReasonability && Math.abs(shipping1 - shipping2) > shipping1 * 0.3) {
      const maxShipping = Math.max(shipping1, shipping2)
      return maxShipping * 0.7
    }

    return (shipping1 + shipping2) / 2
  }

  const calculateFinalPrice = () => {
    const vatAmount = basePrice * (parseInt(vat) / 100)
    const priceWithVat = basePrice + vatAmount
    
    const fixedCommissionAmount = priceWithVat * (FIXED_COMMISSION / 100)
    const installmentCommissionAmount = priceWithVat * (parseFloat(installmentPlan) / 100)
    
    const shippingAverage = calculateShippingAverage()
    
    const totalCosts = priceWithVat + fixedCommissionAmount + installmentCommissionAmount + shippingAverage
    const transactionFees = totalCosts * (TRANSACTION_FEE / 100) * 3
    


    let finalPrice = totalCosts + transactionFees + desiredProfit

    // Validar margen mínimo
    const currentMargin = (desiredProfit / finalPrice) * 100
    if (currentMargin < minMargin) {
      finalPrice = desiredProfit / (minMargin / 100)
    }



    return totalCosts + transactionFees + desiredProfit
  }

  const getMarginColor = (currentMargin: number) => {
    if (currentMargin >= minMargin) return "text-green-500"
    if (currentMargin >= minMargin * 0.8) return "text-yellow-500"
    return "text-red-500"
  }

  useEffect(() => {
    const calculated = calculateFinalPrice()
    setFinalPrice(calculated)
  }, [basePrice, vat, installmentPlan, shippingType1, shippingType2, useReasonability, desiredProfit])

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Herramienta para Publicar
        </CardTitle>
        <CardDescription>Ayuda para Vender</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label>Costo del Producto (sin IVA)</Label>
              <Input
                type="number"
                value={basePrice || ''}
                onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div>
              <Label>IVA</Label>
              <Select value={vat} onValueChange={setVat}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar IVA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10.5">10.5%</SelectItem>
                  <SelectItem value="21">21%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Comisión Cuotas</Label>
              <Select value={installmentPlan} onValueChange={setInstallmentPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar plan de cuotas" />
                </SelectTrigger>
                <SelectContent>
                  {installmentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label} ({option.value}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Envío Tipo 1</Label>
              <Input
                type="number"
                value={shippingType1 || ''}
                onChange={(e) => setShippingType1(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div>
              <Label>Envío Tipo 2</Label>
              <Select value={shippingType2} onValueChange={setShippingType2}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar peso" />
                </SelectTrigger>
                <SelectContent>
                  {shippingOptions.map((option) => (
                    <SelectItem key={option.weight} value={option.price.toString()}>
                      {option.weight}: ${option.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={useReasonability}
                onCheckedChange={setUseReasonability}
              />
              <Label>Aplicar Razonabilidad (70%)</Label>
            </div>
          </div>

          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="optional">
                <AccordionTrigger>
                  <span className="text-sm font-medium">Campos Opcionales</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div>
                    <Label>Precio Competencia 1</Label>
                    <Input
                      type="number"
                      value={competitor1 || ''}
                      onChange={(e) => setCompetitor1(parseFloat(e.target.value) || 0)}
                    />
                  </div>

                  <div>
                    <Label>Precio Competencia 2</Label>
                    <Input
                      type="number"
                      value={competitor2 || ''}
                      onChange={(e) => setCompetitor2(parseFloat(e.target.value) || 0)}
                    />
                  </div>

                  <div>
                    <Label>Margen Mínimo Deseado (%)</Label>
                    <Input
                      type="number"
                      value={minMargin || ''}
                      onChange={(e) => setMinMargin(parseFloat(e.target.value) || 0)}
                    />
                  </div>

                  <div>
                    <Label>Ganancia Deseada ($)</Label>
                    <Input
                      type="number"
                      value={desiredProfit || ''}
                      onChange={(e) => setDesiredProfit(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Resultados</h3>
          
          <div className="grid gap-4">
            <div>
              <span className="font-semibold">Precio a Publicar:</span>
              <span className="ml-2 text-xl">
                ${finalPrice.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div>
              <span className="font-semibold">Margen de Ganancia:</span>
              <span className={`ml-2 ${getMarginColor((desiredProfit / finalPrice) * 100)}`}>
                {((desiredProfit / finalPrice) * 100).toFixed(1)}% (${desiredProfit.toLocaleString('es-AR', { minimumFractionDigits: 2 })})
              </span>
            </div>

            <div>
              <span className="font-semibold">Cobro a Recibir:</span>
              <div className="ml-4 space-y-1">
                <div>Envío Tipo 1: ${(finalPrice - (finalPrice * (TRANSACTION_FEE / 100))).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</div>
                <div>Envío Tipo 2: ${(finalPrice - (finalPrice * (TRANSACTION_FEE / 100))).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</div>
                <div>Promedio: ${(finalPrice - (finalPrice * (TRANSACTION_FEE / 100))).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</div>
              </div>
            </div>

            {(competitor1 > 0 || competitor2 > 0) && (
              <div>
                <span className="font-semibold">Comparativa Competencia:</span>
                <div className="ml-4 space-y-1">
                  {competitor1 > 0 && (
                    <div>
                      Competencia 1: ${competitor1.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      ({(((competitor1 - finalPrice) / finalPrice) * 100).toFixed(1)}% diferencia)
                    </div>
                  )}
                  {competitor2 > 0 && (
                    <div>
                      Competencia 2: ${competitor2.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      ({(((competitor2 - finalPrice) / finalPrice) * 100).toFixed(1)}% diferencia)
                    </div>
                  )}
                </div>
              </div>
            )}

            {basePrice > 0 && finalPrice < basePrice && (
              <div className="text-red-500 font-semibold">
                ¡Advertencia! El precio a publicar no cubre los costos básicos.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

