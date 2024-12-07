"use client"

import { useState, useEffect } from "react"
import { Calculator } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  const [shippingBuenosAires, setShippingBuenosAires] = useState<number>(0)
  const [shippingOutsideBuenosAires, setShippingOutsideBuenosAires] =
    useState<string>("0")
  const [useReasonability, setUseReasonability] = useState<boolean>(false)
  const [competitor1, setCompetitor1] = useState<number>(0)
  const [competitor2, setCompetitor2] = useState<number>(0)
  const [minMargin, setMinMargin] = useState<number>(7.5)
  const [desiredProfit, setDesiredProfit] = useState<number>(4500)

  // Fixed commission is now 14% (cannot be modified)
  const FIXED_COMMISSION = 14
  const TRANSACTION_FEE = 0.6

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
    { label: "Sin cuotas", value: "0" },
    { label: "3 cuotas mismo precio", value: "8.50" },
    { label: "6 cuotas mismo precio", value: "14" },
    { label: "3 cuotas simple", value: "6.43" },
    { label: "6 cuotas simple", value: "12.27" },
  ]

  const calculateShippingAverage = () => {
    const shippingBA = shippingBuenosAires
    const shippingOutside = parseFloat(shippingOutsideBuenosAires)

    if (
      useReasonability &&
      Math.abs(shippingBA - shippingOutside) > shippingBA * 0.3
    ) {
      const maxShipping = Math.max(shippingBA, shippingOutside)
      return maxShipping * 0.7
    }

    return (shippingBA + shippingOutside) / 2
  }

  const calculateFinalPrice = () => {
    // Calculate base price with VAT
    const vatAmount = basePrice * (parseInt(vat) / 100)
    const priceWithVat = basePrice + vatAmount

    // Apply fixed 14% commission and installment plan commission
    const fixedCommissionAmount = priceWithVat * (FIXED_COMMISSION / 100)
    const installmentCommissionAmount =
      priceWithVat * (parseFloat(installmentPlan) / 100)

    // Calculate shipping costs
    const shippingAverage = calculateShippingAverage()

    // Calculate total costs before desired profit
    const totalCosts =
      priceWithVat +
      fixedCommissionAmount +
      installmentCommissionAmount +
      shippingAverage

    // Calculate transaction fees
    const transactionFees = totalCosts * (TRANSACTION_FEE / 100) * 3

    // Calculate initial selling price without considering desired profit
    let sellingPrice = totalCosts + transactionFees

    // Check if minimum margin is met
    const calculateMargin = (price: number) => {
      return (desiredProfit / price) * 100
    }

    // Adjust price to meet minimum margin requirement
    if (calculateMargin(sellingPrice) < minMargin) {
      sellingPrice = desiredProfit / (minMargin / 100)
    }

    return {
      baseSellingPrice: sellingPrice,
      totalPriceWithProfit: sellingPrice + desiredProfit,
      desiredProfit: desiredProfit,
      margin: calculateMargin(sellingPrice),
    }
  }
  const calculatePriceWithShipping = (shippingCost: number) => {
   
    return calculateFinalPrice().totalPriceWithProfit + shippingCost
  }

  const getMarginColor = (currentMargin: number) => {
    if (currentMargin >= minMargin) return "text-green-500"
    if (currentMargin >= minMargin * 0.8) return "text-yellow-500"
    return "text-red-500"
  }

  const [calculatedPrices, setCalculatedPrices] = useState({
    baseSellingPrice: 0,
    totalPriceWithProfit: 0, // MODIFICADO: Se agrega totalPriceWithProfit al estado
    desiredProfit: 0,
    margin: 0,
  })

  useEffect(() => {
    const calculated = calculateFinalPrice()
    setCalculatedPrices(calculated)
  }, [
    basePrice,
    vat,
    installmentPlan,
    shippingBuenosAires,
    shippingOutsideBuenosAires,
    useReasonability,
    desiredProfit,
    minMargin,
  ])



  // Calculate prices with shipping

  const finalPriceWithBuenosAiresShipping = calculatePriceWithShipping(shippingBuenosAires)
  const finalPriceWithOutsideShipping = calculatePriceWithShipping(parseFloat(shippingOutsideBuenosAires))
  const averageShipping = (finalPriceWithBuenosAiresShipping + finalPriceWithOutsideShipping) / 2 // MODIFICADO: Se calcula el promedio con los precios de ganancia


 

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
                value={basePrice || ""}
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
              <Select
                value={installmentPlan}
                onValueChange={setInstallmentPlan}
              >
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
              <Label>Envío Provincia de Buenos Aires</Label>
              <Input
                type="number"
                value={shippingBuenosAires || ""}
                onChange={(e) =>
                  setShippingBuenosAires(parseFloat(e.target.value) || 0)
                }
              />
            </div>

            <div>
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
                      value={competitor1 || ""}
                      onChange={(e) =>
                        setCompetitor1(parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>

                  <div>
                    <Label>Precio Competencia 2</Label>
                    <Input
                      type="number"
                      value={competitor2 || ""}
                      onChange={(e) =>
                        setCompetitor2(parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>

                  <div>
                    <Label>Margen Mínimo Deseado (%)</Label>
                    <Input
                      type="number"
                      value={minMargin || ""}
                      onChange={(e) =>
                        setMinMargin(parseFloat(e.target.value) || 0)
                      }
                    />
                  </div>

                  <div>
                    <Label>Ganancia Deseada ($)</Label>
                    <Input
                      type="number"
                      value={desiredProfit || ""}
                      onChange={(e) =>
                        setDesiredProfit(parseFloat(e.target.value) || 0)
                      }
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
              <div>
                <span className="font-semibold">
                  Precio a Publicar (sin Ganancia):
                </span>
                <span className="ml-2 text-xl">
                  $
                  {calculatedPrices.baseSellingPrice.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <span className="font-semibold">
                Precio Total (Precio + Ganancia):
              </span>
              <span className="ml-2 text-xl">
                $
                {calculatedPrices.totalPriceWithProfit.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            <div>
              <span className="font-semibold">Margen de Ganancia:</span>
              <span
                className={`ml-2 ${getMarginColor(calculatedPrices.margin)}`}
              >
                {calculatedPrices.margin.toFixed(1)}%
              </span>
            </div>

            <div>
              <span className="font-semibold">Cobro a Recibir:</span>
              <div className="ml-4 space-y-1">
                <div className="mb-2">
                  <h2>
                    {" "}
                    Envío en Buenos Aires:
                    <span className="text-neutral-950   border-2 border-violet-600 p-1 mr-1 text-lg font-bold">
                      $
                      {finalPriceWithBuenosAiresShipping.toLocaleString(
                        "es-AR",
                        { minimumFractionDigits: 2 }
                      )} {`=>`} {" "}
                    </span>
                    (Precio: $
                      {calculatedPrices.totalPriceWithProfit.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}{" "}
                    + Envío 1: $
                    {shippingBuenosAires.toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                    })}
                    ){"  "} 
                  </h2>
                </div>
                <div>
                  <h2>
                    {" "}
                    Envío Fuera de Buenos Aires:{" "}
                    <span className="text-neutral-950  border-2 border-violet-600 p-1 mr-1 text-lg font-bold">
                      {" "}
                      $
                      {finalPriceWithOutsideShipping.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}{" "} {`=>`}
                    </span>{" "}
                    (Precio: $    {calculatedPrices.totalPriceWithProfit.toLocaleString("es-AR", {
                  minimumFractionDigits: 2,
                })}
                  {" "}
                    + Envío 2: $
                    {parseFloat(shippingOutsideBuenosAires).toLocaleString(
                      "es-AR",
                      { minimumFractionDigits: 2 }
                    )}
                    ){" "}
                  </h2>
                </div>
                <div>
                  <h2 className="mt-2">       Promedio de Envío: 
                 <span className="border-2 border-violet-600 p-1 mr-1 text-lg font-bold">                ${averageShipping.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                 </span></h2>
           
                </div>
              </div>
            </div>

            {(competitor1 > 0 || competitor2 > 0) && (
              <div>
                <span className="font-semibold">Comparativa Competencia:</span>
                <div className="ml-4 space-y-1">
                  {competitor1 > 0 && (
                    <div>
                      Competencia 1: $
                      {competitor1.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}
                      (
                      {(
                        ((competitor1 - calculatedPrices.baseSellingPrice) /
                          calculatedPrices.baseSellingPrice) *
                        100
                      ).toFixed(1)}
                      % diferencia)
                    </div>
                  )}
                  {competitor2 > 0 && (
                    <div>
                      Competencia 2: $
                      {competitor2.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                      })}
                      (
                      {(
                        ((competitor2 - calculatedPrices.baseSellingPrice) /
                          calculatedPrices.baseSellingPrice) *
                        100
                      ).toFixed(1)}
                      % diferencia)
                    </div>
                  )}
                </div>
              </div>
            )}

            {basePrice > 0 && calculatedPrices.baseSellingPrice < basePrice && (
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
