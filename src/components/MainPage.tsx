'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, DollarSign, CreditCard, Percent } from 'lucide-react'
import { motion } from 'framer-motion'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

const formSchema = z.object({
  valorProducto: z.string().min(1, 'El valor del producto es requerido'),
  cuotas: z.enum(['3', '6', '6s', '9s']),
  comisionFija: z.string().min(1, 'La comisión fija es requerida'),
})

export default function Cotizador() {
  const [isLoading, setIsLoading] = useState(false)
  const [resultado, setResultado] = useState<{
    valorFinal: number;
    valorCuota: number;
    comisionTotal: number;
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valorProducto: '',
      cuotas: '3',
      comisionFija: '14',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setResultado(null)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const valorProducto = parseFloat(values.valorProducto)
    const comisionFija = parseFloat(values.comisionFija) / 100
    let comisionExtra = 0
    let numeroCuotas = 3

    switch (values.cuotas) {
      case '3':
        comisionExtra = 0.08
        numeroCuotas = 3
        break
      case '6':
        comisionExtra = 0.14
        numeroCuotas = 6
        break
      case '6s':
        comisionExtra = 0.0693
        numeroCuotas = 6
        break
      case '9s':
        comisionExtra = 0.23
        numeroCuotas = 9
        break
    }

    const comisionTotal = comisionFija + comisionExtra
    const valorFinal = valorProducto * (1 + comisionTotal)
    const valorCuota = valorFinal / numeroCuotas

    setResultado({
      valorFinal,
      valorCuota,
      comisionTotal: comisionTotal * 100,
    })
    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gray-100 overflow-hidden">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Set de Pintura Cotizador</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1 flex items-center space-x-4">
                <div className="w-16 h-16 bg-red-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <FormField
                  control={form.control}
                  name="valorProducto"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Valor del Producto</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <FormField
                  control={form.control}
                  name="cuotas"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Plan de Cuotas</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Seleccione las cuotas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="3">3 cuotas (8% extra)</SelectItem>
                          <SelectItem value="6">6 cuotas (14% extra)</SelectItem>
                          <SelectItem value="6s">6 cuotas simples (6,93%)</SelectItem>
                          <SelectItem value="9s">9 cuotas simples (23%)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex-shrink-0 flex items-center justify-center">
                  <Percent className="w-8 h-8 text-white" />
                </div>
                <FormField
                  control={form.control}
                  name="comisionFija"
                  
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Comisión Fija (%)</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-[#EF4444] hover:bg-[#EF4444] text-white">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Mezclando...' : 'Mezclar Colores y Cotizar'}
            </Button>
          </form>
        </Form>
        {resultado && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-gray-800 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Paleta de Resultados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-500 p-4 rounded-md">
                <p className="text-white font-semibold">Valor Final:</p>
                <p className="text-2xl font-bold text-white">${resultado.valorFinal.toFixed(2)}</p>
              </div>
              <div className="bg-blue-500 p-4 rounded-md">
                <p className="text-white font-semibold">Valor por Cuota:</p>
                <p className="text-2xl font-bold text-white">${resultado.valorCuota.toFixed(2)}</p>
              </div>
              <div className="bg-green-500 p-4 rounded-md">
                <p className="text-white font-semibold">Comisión Total:</p>
                <p className="text-2xl font-bold text-white">{resultado.comisionTotal.toFixed(2)}%</p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

